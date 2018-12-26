#!/usr/bin/env bash

PROJECT_NAME=ddd
PROJECT_UUID=46e46752-08e6-11e9-a1cf-06f3e8a0c120

rm -rf ./kibana || true
mkdir kibana

sed \
    -e "s/<PROJECT_NAME>/${PROJECT_NAME}/g" \
    -e "s/<PROJECT_UUID>/${PROJECT_UUID}/g" \
 savedSearchesTemplate.json > kibana/savedSearches.json

sed \
    -e "s/<PROJECT_NAME>/${PROJECT_NAME}/g" \
    -e "s/<PROJECT_UUID>/${PROJECT_UUID}/g" \
 visualizationsTemplate.json > kibana/visualizations.json

sed \
    -e "s/<PROJECT_NAME>/${PROJECT_NAME}/g" \
    -e "s/<PROJECT_UUID>/${PROJECT_UUID}/g" \
 dashboardsTemplate.json > kibana/dashboards.json