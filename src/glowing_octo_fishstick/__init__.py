from numpy.typing import ArrayLike


def add_n(x: float | int | ArrayLike, n:float | int=1) -> float | int | ArrayLike:
    """
    Adds 1 to the input number.
    
    General Inputs
    :x:float|int|array
        A number or array
    
    Optional Inputs
    :n:float|int
        A number
    
    Returns
    :n+1:float|int|array
        The original number, plus 1
    """
    y = x + n
    return y
