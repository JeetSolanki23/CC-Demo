import json
import os


def test_ci_gate():
    flags_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "ci_flags.json")
    )
    with open(flags_path, "r", encoding="utf-8") as handle:
        flags = json.load(handle)

    assert not flags.get("force_fail", False), (
        "CI gate is set to fail. Set force_fail to false in backend/ci_flags.json."
    )
