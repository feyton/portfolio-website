import random
from datetime import datetime


def code_generator():
    chars = random.randint(1, 1000000)
    code = "%s-%s" % (datetime.now(), chars)
    return code
