#!/bin/sh
./hulk.sh
ipfs add -wr --chunker=rabin js templates index.html robots.txt
