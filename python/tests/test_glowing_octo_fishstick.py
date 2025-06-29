import random
from pytest import fixture

random.seed(1)

@fixture
def toast_quote():
    return 'Be the toast that lifts the breakfast table.'


def test_get_quote(toast_quote):
    from python.src.get_quote import get_quote
    assert get_quote() == toast_quote