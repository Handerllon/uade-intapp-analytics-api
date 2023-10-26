#!/bin/bash
# sudo apt-get install -y python3-venv
python3 -m venv python_env
source python_env/bin/activate
pip -V
pip install -r ./boards/requirements.txt