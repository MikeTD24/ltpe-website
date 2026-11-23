"""Wait until the exact uploaded Pages artifact is visible to GitHub's REST API."""

import json
import os
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def wait_for_artifact(environment, attempts=12, interval=5):
    repository = environment["GITHUB_REPOSITORY"]
    run_id = environment["GITHUB_RUN_ID"]
    artifact_id = environment["PAGES_ARTIFACT_ID"]
    token = environment["GH_TOKEN"]
    if not run_id.isdigit() or not artifact_id.isdigit():
        raise ValueError("Missing or invalid run/artifact identifier")
    url = (
        f"https://api.github.com/repos/{repository}/actions/runs/{run_id}"
        "/artifacts?per_page=100"
    )
    request = Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    consecutive_ready = 0
    for attempt in range(attempts):
        try:
            with urlopen(request, timeout=15) as response:
                artifacts = json.load(response).get("artifacts", [])
            matches = [a for a in artifacts if a.get("name") == "github-pages"]
            ready = (
                len(matches) == 1
                and str(matches[0].get("id")) == artifact_id
                and not matches[0].get("expired", True)
            )
            consecutive_ready = consecutive_ready + 1 if ready else 0
            if consecutive_ready >= 2:
                print("Pages artifact is visible and confirmed; deployment can proceed.")
                return
        except HTTPError as error:
            if error.code != 429 and error.code < 500:
                raise RuntimeError(f"Artifact API refused the check (HTTP {error.code})") from None
            consecutive_ready = 0
        except (URLError, TimeoutError):
            consecutive_ready = 0
        if attempt + 1 < attempts:
            print(f"Waiting for Pages artifact visibility ({attempt + 1}/{attempts})...")
            time.sleep(interval)
    raise RuntimeError("Pages artifact was not confirmed in time; publication stopped safely.")


if __name__ == "__main__":
    wait_for_artifact(os.environ)
