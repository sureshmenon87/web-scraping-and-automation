## ELK Stack with Node.js Logs

This setup runs a full ELK stack (Elasticsearch, Logstash, Kibana) + Filebeat to collect logs from the Node.js service and visualize them in Kibana.

Logs flow like this:

```
Node.js (stdout) → Docker → Filebeat → Logstash → Elasticsearch → Kibana

```

```

elk/
├── docker-compose.yml # ELK + Node.js service orchestration
├── filebeat.yml # Filebeat config (collect container logs)
└── logstash.conf # Logstash pipeline (parse & ship logs)
```

## 🚀 Running the Stack

### 1. Build and Start Containers

```
cd elk
docker-compose up --build
```

This will start:

```

node-service → Your Node.js app (port 3000)
elasticsearch → Stores logs (port 9200)
kibana → UI for search/visualization (port 5601)
logstash → Processes logs from Filebeat
filebeat → Collects container logs from Docker
```

### 2. Verify Elasticsearch

Open: http://localhost:9200

You should see Elasticsearch JSON info.

```
{
  "name": "5691b90d0513",
  "cluster_name": "docker-cluster",
  "cluster_uuid": "2iYHkLZRRBmvZGUd6rnlYw",
  "version": {
    "number": "7.17.0",
    "build_flavor": "default",
    "build_type": "docker",
    "build_hash": "bee86328705acaa9a6daede7140defd4d9ec56bd",
    "build_date": "2022-01-28T08:36:04.875279988Z",
    "build_snapshot": false,
    "lucene_version": "8.11.1",
    "minimum_wire_compatibility_version": "6.8.0",
    "minimum_index_compatibility_version": "6.0.0-beta1"
  },
  "tagline": "You Know, for Search"
}
```

### Verify Kibana

```
Open: http://localhost:5601
```

## 4. Setup Data View in Kibana

1. Go to Stack Management → Index patterns

2. Create new index pattern

3. Name: nodeapp-logs-\*

4. Time field: @timestamp

5. Save.

6. View Logs

### Go to Discover in Kibana.

Select nodeapp-logs-\*.

You’ll see all Node.js logs (console.log & console.error).
