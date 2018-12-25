#!/bin/bash

OPENSHIFT_NAMESPACE=alitestproj03
USERNAME=admin
# DEBUG=true
# loglevelint=7
ES_BASE="https://elastic.apb-testing.skunkhenry.com"
OPENSHIFT_USER="admin"
TOKEN="WbbrO4yYUwp7CR5q63uUOuAe7G11xIn8sWHa_thNnG4"

get_hash() {
    printf "%s" "$1" | sha1sum | awk '{print $1}'
}

get_kibana_index_name() {
    echo .kibana.$(get_hash "$1")
}

curl_output() {
    python -mjson.tool
}

es_util() {

#    if [[ ! -z "${DEBUG:-}" ]]; then
    set -x
#    fi

    ES_BASE=${ES_BASE:-https://localhost:9200}
    curl_get='curl -s -k -X GET'

    set -euo pipefail

    while (($#))
    do
    case $1 in
        --query=*)
          QUERY=${1#*=}
          ;;
        *)
          break;
          ;;
      esac
      shift
    done

    QUERY=${QUERY:-""}
    INDEX=${INDEX:-"project.$OPENSHIFT_NAMESPACE.*"}
    TYPE=${TYPE:-"_search"}
    SIZE=${SIZE:-10}
    SORT=${SORT:-"@timestamp:desc"}
    OPTIONS=${OPTIONS:-"size=$SIZE&sort=$SORT&pretty"}

    ES_BASE=${ES_BASE:-https://localhost:9200}

    if [ -z "${QUERY:-}" ]; then
      QUERY="$INDEX/$TYPE?$OPTIONS"
    fi

    curl -s -k -H "Authorization: Bearer ${TOKEN}" -H "Content-type: application/json" -H "X-Proxy-Remote-User: ${OPENSHIFT_USER}" -H "X-Forwarded-For: 127.0.0.1" "$ES_BASE/$QUERY" "$@"
#    curl -s -k "$ES_BASE/$QUERY" "$@"
}

kibindex=$( get_kibana_index_name "$USERNAME" )

existingDocumentStatus=$(es_util --query="$kibindex/search/Sync-Audit-logs" -XHEAD --write-out %{http_code})
if [[ "$status_code" -ne 200 ]] ; then
    #cat sync_saved_search.json | \
        sed "s/[$]OPENSHIFT_NAMESPACE[$]/$OPENSHIFT_NAMESPACE/g" | \
        python -c '
import sys
import json
obj = json.load(sys.stdin)
for doc in obj:
  hdr = {"create":{"_type":doc["_type"],"_id":doc["_id"]}}
  json.dump(hdr, sys.stdout)
  sys.stdout.write("\n")
  json.dump(doc["_source"], sys.stdout)
  sys.stdout.write("\n\n")
' |  es_util --query="$kibindex/_bulk" -XPOST --data-binary @- | curl_output
else
    echo "Search with id "
fi


#cat sync_saved_search.json | \
#    sed "s/[$]OPENSHIFT_NAMESPACE[$]/$OPENSHIFT_NAMESPACE/g" | \
#    python -c '
#import sys
#import json
#obj = json.load(sys.stdin)
#for doc in obj:
#  hdr = {"create":{"_type":doc["_type"],"_id":doc["_id"]}}
#  json.dump(hdr, sys.stdout)
#  sys.stdout.write("\n")
#  json.dump(doc["_source"], sys.stdout)
#  sys.stdout.write("\n\n")
#' |  es_util --query="$kibindex/_bulk" -XPOST --data-binary @- | curl_output

#template=$(cat sync_saved_search.json)
#echo "Template------------"
#echo ${template}
#
#echo "Replaced------------"
#replaced=$(echo ${template} | sed "s/[$]OPENSHIFT_NAMESPACE[$]/$OPENSHIFT_NAMESPACE/g")
#echo ${replaced}
#
#echo 'Formatted-----------'
#formatted=$(echo ${replaced} | python -c '
#import sys
#import json
#obj = json.load(sys.stdin)
#for doc in obj:
#  hdr = {"create":{"_type":doc["_type"],"_id":doc["_id"]}}
#  json.dump(hdr, sys.stdout)
#  sys.stdout.write("\n")
#  json.dump(doc["_source"], sys.stdout)
#  sys.stdout.write("\n\n")
#')
#echo ${formatted}
#
#
#echo ${formatted} | curl -s -k -H 'Authorization: Bearer WbbrO4yYUwp7CR5q63uUOuAe7G11xIn8sWHa_thNnG4' -H 'X-Proxy-Remote-User: admin' -H 'X-Forwarded-For: 127.0.0.1' https://elastic.apb-testing.skunkhenry.com/.kibana.d033e22ae348aeb5660fc2140aec35850c4da997/_bulk -H 'Content-type: application/json' -XPOST --data-binary @-
#
#echo 'Creation output-----'
#creationOutput=$(echo ${formatted} | es_util --query="$kibindex/_bulk" -H "Content-type: application/json" -XPOST --data-binary @-)
#echo 'Creation output-----'
#echo ${creationOutput}


#    sed "s/[$]OPENSHIFT_NAMESPACE[$]/$OPENSHIFT_NAMESPACE/g" | \
#    python -c '
#import sys
#import json
#obj = json.load(sys.stdin)
#for doc in obj:
#  hdr = {"create":{"_type":doc["_type"],"_id":doc["_id"]}}
#  json.dump(hdr, sys.stdout)
#  sys.stdout.write("\n")
#  json.dump(doc["_source"], sys.stdout)
#  sys.stdout.write("\n")
#' | es_util --query="$kibindex/_bulk" -H "Content-type: application/json" -XPOST --data-binary @- | curl_output
#
#
#cat sync_saved_search.json | \
#    sed "s/[$]OPENSHIFT_NAMESPACE[$]/$OPENSHIFT_NAMESPACE/g" | \
#    python -c '
#import sys
#import json
#obj = json.load(sys.stdin)
#for doc in obj:
#  hdr = {"create":{"_type":doc["_type"],"_id":doc["_id"]}}
#  json.dump(hdr, sys.stdout)
#  sys.stdout.write("\n")
#  json.dump(doc["_source"], sys.stdout)
#  sys.stdout.write("\n")
#' | es_util --query="$kibindex/_bulk" -H "Content-type: application/json" -XPOST --data-binary @- | curl_output
#
##es_util --query="$kibindex/$INDEX_PATTERN_TYPE/$INDEX_PATTERN" -XPUT --data-binary @- | curl_output
##
##
##info Adding the Kibana UI objects . . .
##{
##    for file in $KIBANA_UI_OBJECTS_DIR/*.json ; do
##        if [ ! -f "$file" ] ; then
##            error Missing file "$file" in $KIBANA_UI_OBJECTS_DIR
##            ls -alrtF $KIBANA_UI_OBJECTS_DIR
##            continue
##        fi
##        cat "$file" | python -c '
##import sys
##import json
##obj = json.load(sys.stdin)
##for doc in obj:
##  hdr = {"create":{"_type":doc["_type"],"_id":doc["_id"]}}
##  json.dump(hdr, sys.stdout)
##  sys.stdout.write("\n")
##  json.dump(doc["_source"], sys.stdout)
##  sys.stdout.write("\n")
##'
##    done
##} | es_util --query="$kibindex/_bulk" -H "Content-type: application/json" -XPOST --data-binary @- | curl_output
