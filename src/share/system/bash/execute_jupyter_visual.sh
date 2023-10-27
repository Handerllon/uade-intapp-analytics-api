#!/bin/bash
pip -V
pwd
source ./python_env/bin/activate
pip -V
jupyter nbconvert --output-dir='./boards/html/' --to html ./boards/Visual_Analysis.ipynb
