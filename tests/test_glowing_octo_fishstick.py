import numpy as np
from pytest import fixture

from glowing_octo_fishstick import add_n

# Fixtures
@fixture
def array():
    return np.array([0, 1, 2, 3])

@fixture
def expected_array():
    return np.array([1, 2, 3, 4])

# Tests
def test_add_n(array, expected_array):
    assert (add_n(array) == expected_array).all()
