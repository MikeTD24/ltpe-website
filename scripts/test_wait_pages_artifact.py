import io
import json
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

spec = spec_from_file_location("artifact_wait", Path(__file__).with_name("wait-pages-artifact.py"))
artifact_wait = module_from_spec(spec)
spec.loader.exec_module(artifact_wait)

ENVIRONMENT = {
    "GITHUB_REPOSITORY": "example/site",
    "GITHUB_RUN_ID": "123",
    "PAGES_ARTIFACT_ID": "456",
    "GH_TOKEN": "test-token-not-a-real-credential",
}
READY = {"id": 456, "name": "github-pages", "expired": False}


def response(artifacts):
    return io.BytesIO(json.dumps({"artifacts": artifacts}).encode())


class ArtifactVisibilityTests(unittest.TestCase):
    @patch.object(artifact_wait.time, "sleep")
    @patch.object(artifact_wait, "urlopen")
    def test_delayed_visibility_requires_two_confirmations(self, request, sleep):
        request.side_effect = [response([]), response([READY]), response([READY])]
        artifact_wait.wait_for_artifact(ENVIRONMENT, attempts=3, interval=0)
        self.assertEqual(request.call_count, 3)

    @patch.object(artifact_wait.time, "sleep")
    @patch.object(artifact_wait, "urlopen")
    def test_wrong_expired_or_duplicate_artifacts_cannot_deploy(self, request, sleep):
        cases = [
            [],
            [{**READY, "id": 999}],
            [{**READY, "expired": True}],
            [READY, READY],
        ]
        for artifacts in cases:
            with self.subTest(artifacts=artifacts):
                request.side_effect = [response(artifacts), response(artifacts)]
                with self.assertRaises(RuntimeError):
                    artifact_wait.wait_for_artifact(ENVIRONMENT, attempts=2, interval=0)

    @patch.object(artifact_wait.time, "sleep")
    @patch.object(artifact_wait, "urlopen")
    def test_transient_server_error_is_retried(self, request, sleep):
        request.side_effect = [
            HTTPError("https://example.invalid", 503, "Unavailable", {}, None),
            response([READY]),
            response([READY]),
        ]
        artifact_wait.wait_for_artifact(ENVIRONMENT, attempts=3, interval=0)

    @patch.object(artifact_wait.time, "sleep")
    @patch.object(artifact_wait, "urlopen")
    def test_permission_errors_fail_without_retry(self, request, sleep):
        request.side_effect = HTTPError("https://example.invalid", 403, "Forbidden", {}, None)
        with self.assertRaisesRegex(RuntimeError, "HTTP 403"):
            artifact_wait.wait_for_artifact(ENVIRONMENT)
        self.assertEqual(request.call_count, 1)
        sleep.assert_not_called()


if __name__ == "__main__":
    unittest.main()
