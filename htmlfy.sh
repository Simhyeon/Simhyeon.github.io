#!/bin/sh

# COMMAND='$forline-($if($isempty($:()),</p><p>))'
COMMAND='$forline-($if($:(),wow))'

cat $1 | rad --sc chomp | rad --pipe --literal $COMMAND --log
