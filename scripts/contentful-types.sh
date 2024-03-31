export $(cat .env | awk '!/^\\s*#/' | awk '!/^\\s*$/')
cf-content-types-generator \
  --spaceId $CONTENTFUL_SPACE_ID \
  --token $CONTENTFUL_MANAGEMENT_TOKEN \
  -o src/contentful/types \
  -X
prettier --write src/contentful/types  