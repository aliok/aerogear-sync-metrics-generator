#!/usr/bin/env bash

PROJECT_NAME=aaa
PROJECT_UUID=49f9a0b6-09b5-11e9-9597-069f7827c758

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