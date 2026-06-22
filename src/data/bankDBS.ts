import type { Question } from '../types';

export const BANK_DBS: Question[] = [
  // ─── Workload-Specific Database Design (~18 questions) ───────────────────

  {
    domain: 'Workload-Specific Database Design',
    q: 'A startup is building a social network application that requires storing user profiles, friend relationships, and activity feeds. The data is highly interconnected, and the team needs to run complex traversal queries such as "friends of friends who liked the same post." Which AWS database service is the best fit?',
    opts: [
      'Amazon DynamoDB with a GSI on the user relationship table',
      'Amazon RDS for PostgreSQL with recursive CTEs',
      'Amazon Neptune',
      'Amazon DocumentDB with MongoDB-compatible API',
    ],
    a: 2,
    exp: 'Amazon Neptune is a purpose-built graph database optimized for storing and querying highly connected data. It supports both Gremlin and SPARQL query languages, making complex graph traversals like "friends of friends" highly efficient. DynamoDB and relational databases require complex workarounds for deep graph traversals.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'An IoT company collects sensor readings from 10,000 devices every second. They need to run time-range queries and perform aggregations over the last 30 days of data, while older data should be automatically tiered to cheaper storage. Which AWS database service best fits this requirement?',
    opts: [
      'Amazon DynamoDB with TTL enabled',
      'Amazon Timestream',
      'Amazon RDS for MySQL with partitioned tables',
      'Amazon Redshift',
    ],
    a: 1,
    exp: 'Amazon Timestream is purpose-built for time-series data such as IoT sensor readings. It automatically tiers recent data to in-memory store and older data to a magnetic store, and supports time-range queries and aggregations natively. DynamoDB TTL only deletes data rather than tiering it, and relational databases lack native time-series optimizations.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A financial institution needs an immutable, cryptographically verifiable ledger to record every change to customer account balances. Auditors must be able to prove that the history has not been tampered with. Which AWS database service is most appropriate?',
    opts: [
      'Amazon Aurora with audit logging enabled',
      'Amazon DynamoDB Streams with Lambda archiving',
      'Amazon QLDB',
      'Amazon RDS for PostgreSQL with pgaudit extension',
    ],
    a: 2,
    exp: 'Amazon QLDB (Quantum Ledger Database) is a fully managed ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log. It is specifically designed to maintain a complete and verifiable history of data changes, which is ideal for financial audit requirements. Other services can log changes but cannot provide cryptographic proof of immutability.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A gaming company stores player session data in a DynamoDB table with PlayerID as the partition key. During popular game events, 80% of writes target only 10% of players (hot partitions). Which strategy best resolves this hot partition issue?',
    opts: [
      'Switch to on-demand capacity mode',
      'Add a random suffix (1–10) to the partition key and use scatter-gather reads',
      'Enable DynamoDB Accelerator (DAX) for caching',
      'Create a GSI with a different partition key attribute',
    ],
    a: 1,
    exp: 'Write sharding by appending a random suffix (e.g., PlayerID#1 through PlayerID#10) distributes writes across multiple partitions, eliminating hot spots. Reads use scatter-gather to query all suffix variants and merge results. On-demand mode helps with capacity but does not fix uneven partition distribution. DAX caches reads but does not address write hot spots.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company is migrating a MongoDB workload to AWS. They want MongoDB compatibility with minimal application changes and need support for ACID transactions across documents. Which AWS managed service should they choose?',
    opts: [
      'Amazon DynamoDB',
      'Amazon DocumentDB (with MongoDB compatibility)',
      'Amazon Neptune',
      'Amazon Keyspaces (for Apache Cassandra)',
    ],
    a: 1,
    exp: 'Amazon DocumentDB is MongoDB-compatible and supports multi-document ACID transactions, making it the natural migration target for MongoDB workloads. It requires minimal application changes because it implements the MongoDB API. DynamoDB is a key-value/document store but is not MongoDB-compatible. Neptune is a graph database and Keyspaces is Cassandra-compatible.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company runs a ride-sharing application and needs a caching layer to store session tokens with sub-millisecond latency. The session data must support complex data structures like sorted sets for leaderboards and pub/sub messaging for real-time notifications. Which ElastiCache engine should they use?',
    opts: [
      'Memcached, because it supports multi-threading and horizontal scaling',
      'Redis, because it supports rich data structures, pub/sub, and persistence',
      'Memcached, because it has lower memory overhead per connection',
      'Redis Cluster mode disabled, because it is simpler to configure',
    ],
    a: 1,
    exp: 'Amazon ElastiCache for Redis supports rich data structures (sorted sets, hashes, lists), pub/sub messaging, and optional persistence, all of which are required by the ride-sharing application. Memcached is a simpler cache that supports only key-value pairs and lacks pub/sub or complex data types.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company needs an Aurora cluster that can handle unpredictable workloads with traffic spikes ranging from near-zero to thousands of requests per second. They want database capacity to scale automatically without managing instance sizes. Which Aurora feature should they use?',
    opts: [
      'Aurora Global Database',
      'Aurora Multi-Master',
      'Aurora Serverless v2',
      'Aurora Parallel Query',
    ],
    a: 2,
    exp: 'Aurora Serverless v2 automatically scales database capacity in fine-grained increments (0.5 ACU steps) based on actual workload, from near-zero to hundreds of ACUs. It is ideal for unpredictable or variable workloads because you only pay for the capacity consumed. Aurora Global Database addresses cross-region replication, not auto-scaling.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company has a DynamoDB table that stores orders. They frequently query orders by CustomerID (partition key) and need to retrieve orders filtered by OrderDate (sort key range). They also need to query all orders with Status = "PENDING" regardless of customer. Which DynamoDB feature enables the Status query efficiently?',
    opts: [
      'Local Secondary Index (LSI) on Status',
      'Global Secondary Index (GSI) with Status as the partition key',
      'DynamoDB Streams with Lambda to build a secondary lookup table',
      'Scan with a FilterExpression on Status',
    ],
    a: 1,
    exp: 'A GSI with Status as the partition key allows efficient queries across all customers for a specific order status. An LSI only works within a single partition key value (CustomerID), so it cannot query across all customers. A Scan with FilterExpression reads the entire table and is costly at scale.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company is building an e-commerce platform and needs to choose between Amazon Aurora MySQL and Amazon RDS for MySQL. The application requires high read throughput, automatic failover within seconds, and the ability to add up to 15 read replicas. Which service and feature set is most appropriate?',
    opts: [
      'RDS for MySQL with Multi-AZ deployment and up to 5 read replicas',
      'Aurora MySQL with Aurora Replicas providing up to 15 replicas and sub-10-second failover',
      'RDS for MySQL with a read replica in each of 15 Availability Zones',
      'Aurora MySQL with cross-region read replicas for all 15 replicas',
    ],
    a: 1,
    exp: 'Amazon Aurora MySQL supports up to 15 Aurora Replicas within a region that share the same underlying storage, enabling high read throughput with sub-10-second automated failover. Standard RDS MySQL supports only 5 read replicas and failover times are typically 60–120 seconds. Aurora\'s shared storage architecture makes replica lag minimal.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company migrating from Apache Cassandra wants a fully managed AWS service that is Cassandra Query Language (CQL) compatible and requires no changes to their CQL-based application code. Which service should they use?',
    opts: [
      'Amazon DynamoDB',
      'Amazon DocumentDB',
      'Amazon Keyspaces (for Apache Cassandra)',
      'Amazon Neptune',
    ],
    a: 2,
    exp: 'Amazon Keyspaces (for Apache Cassandra) is a scalable, serverless, and fully managed Cassandra-compatible database service. It supports CQL, so applications written for Cassandra require minimal or no code changes. DynamoDB and DocumentDB use different APIs and are not CQL-compatible.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company stores product catalog data in DynamoDB. They need to model a many-to-many relationship between Products and Categories (one product can belong to many categories, one category can have many products). What is the recommended DynamoDB design pattern?',
    opts: [
      'Store all categories as a comma-separated string attribute on each product item',
      'Use an adjacency list pattern with a composite primary key of entity type and ID',
      'Create a separate DynamoDB table for each category',
      'Use a GSI to invert the partition and sort key relationship',
    ],
    a: 1,
    exp: 'The adjacency list pattern is the recommended DynamoDB approach for many-to-many relationships. You store both entity types and their relationships in a single table using a composite key (PK = entity ID, SK = related entity ID), enabling efficient queries in both directions. Storing categories as a comma-separated string is an anti-pattern that makes querying difficult.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'An application needs a Redis-compatible, in-memory database that provides full Redis data structure support AND durability with Multi-AZ and automatic failover, suitable for primary (not cache-only) use cases. Which AWS service satisfies these requirements?',
    opts: [
      'ElastiCache for Redis with cluster mode enabled',
      'ElastiCache for Memcached',
      'Amazon MemoryDB for Redis',
      'ElastiCache for Redis with Multi-AZ replication group',
    ],
    a: 2,
    exp: 'Amazon MemoryDB for Redis is a durable, in-memory database service that provides full Redis compatibility with Multi-AZ durability via a distributed transactional log. Unlike ElastiCache, MemoryDB is designed to be used as a primary database, not just a cache, because every write is stored durably before being acknowledged.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company is running a reporting workload on Aurora MySQL. Queries are full table scans that take hours to run and impact the primary instance performance. They want to offload these analytical queries without launching a separate analytics cluster. Which Aurora feature should they enable?',
    opts: [
      'Aurora Global Database',
      'Aurora Parallel Query',
      'Aurora Serverless v2',
      'Aurora Multi-Master',
    ],
    a: 1,
    exp: 'Aurora Parallel Query pushes down analytical query processing to Aurora\'s distributed storage layer, allowing full table scans to execute across thousands of storage nodes in parallel. This reduces load on the primary instance and significantly speeds up large analytical queries without needing a separate cluster. It is only available for Aurora MySQL.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company needs a globally distributed Aurora cluster where one region is the primary writer and other regions serve as low-latency read endpoints. In case of a regional failure, one of the secondary regions must be promoted to primary within one minute. Which Aurora feature addresses this?',
    opts: [
      'Aurora Serverless v2 deployed in multiple regions',
      'Aurora Multi-Master spanning multiple regions',
      'Aurora Global Database with managed planned failover',
      'Aurora read replicas in multiple regions with Route 53 failover routing',
    ],
    a: 2,
    exp: 'Aurora Global Database replicates data from a primary region to up to five secondary regions with typical replication lag under one second. It supports managed planned failover and unplanned failover, allowing promotion of a secondary region to primary within one minute. Aurora Multi-Master only works within a single region.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company evaluates ElastiCache for a session store. They need the cluster to scale horizontally by adding shards and require data to be partitioned across multiple nodes with no single point of failure. Which ElastiCache configuration should they use?',
    opts: [
      'ElastiCache for Memcached with auto-discovery',
      'ElastiCache for Redis with cluster mode disabled and a single shard',
      'ElastiCache for Redis with cluster mode enabled',
      'ElastiCache for Memcached with a Multi-AZ replication group',
    ],
    a: 2,
    exp: 'ElastiCache for Redis with cluster mode enabled (Redis Cluster) partitions data across multiple shards, each with primary and replica nodes, providing both horizontal scaling and high availability. Memcached does not support replication. Redis with cluster mode disabled has a single shard and cannot scale data horizontally.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company needs to run ML inference directly in Aurora to predict product recommendations without moving data out of the database. Which Aurora feature enables calling Amazon SageMaker models from SQL queries?',
    opts: [
      'Aurora Parallel Query',
      'Aurora Machine Learning integration with Amazon SageMaker',
      'Aurora Global Database with SageMaker endpoint routing',
      'Aurora Lambda integration for ML inference',
    ],
    a: 1,
    exp: 'Aurora Machine Learning integration allows you to invoke Amazon SageMaker (and Amazon Comprehend) models directly from SQL using built-in SQL functions. This enables ML inference on data stored in Aurora without extracting data, running predictions close to where the data lives. Parallel Query is for analytical performance, not ML inference.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A DynamoDB table has a composite key (UserID partition key, Timestamp sort key). A query pattern requires fetching the 10 most recent items for a given UserID sorted by Timestamp descending. What is the most efficient approach?',
    opts: [
      'Perform a Scan with a FilterExpression on UserID and sort results in application code',
      'Use a Query with KeyConditionExpression on UserID and ScanIndexForward=false with Limit=10',
      'Create a GSI with Timestamp as the partition key and query with ScanIndexForward=false',
      'Use a BatchGetItem with 10 known Timestamp values',
    ],
    a: 1,
    exp: 'A Query operation with KeyConditionExpression on the partition key (UserID) combined with ScanIndexForward=false returns items in descending sort key order, and Limit=10 returns only the 10 most recent items efficiently. A Scan reads the entire table and is expensive. BatchGetItem requires knowing the exact keys in advance.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company is choosing between Amazon RDS for Oracle and Amazon RDS Custom for Oracle. Their Oracle database requires a custom database patch that is not yet available through standard RDS maintenance, and they need to install a third-party monitoring agent at the OS level. Which option should they choose?',
    opts: [
      'RDS for Oracle with a custom parameter group to apply the patch',
      'RDS Custom for Oracle, which provides OS and database engine access',
      'Aurora PostgreSQL with Oracle compatibility layer',
      'EC2-hosted Oracle with AWS Backup for snapshots',
    ],
    a: 1,
    exp: 'RDS Custom for Oracle gives customers access to the underlying OS and database engine, allowing custom patches, third-party agents, and configurations not supported in standard RDS. Standard RDS for Oracle is a managed service where OS access is not available. EC2-hosted Oracle is unmanaged and loses all RDS automation benefits.',
  },

  // ─── Deployment & Migration (~14 questions) ─────────────────────────────

  {
    domain: 'Deployment & Migration',
    q: 'A company wants to migrate a 20 TB Oracle database to Aurora PostgreSQL with minimal downtime. The application must remain online during migration. Which AWS services should they use together to achieve this?',
    opts: [
      'AWS Snowball to transfer data and then restore from backup on Aurora',
      'AWS DMS with full-load-and-CDC mode, and AWS SCT to convert the schema',
      'AWS DataSync to replicate the Oracle data files to S3, then import into Aurora',
      'Native Oracle Data Pump export, upload to S3, and import into RDS for Oracle',
    ],
    a: 1,
    exp: 'AWS DMS with full-load-and-CDC (change data capture) replicates all existing data and then continuously replicates ongoing changes, enabling near-zero downtime migration. AWS SCT (Schema Conversion Tool) converts Oracle schemas, stored procedures, and code to PostgreSQL-compatible syntax before migration. Snowball and DataSync do not support live CDC.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'An enterprise is migrating a SQL Server database to Amazon RDS for SQL Server (same engine). This is a homogeneous migration. Which DMS configuration is correct for this scenario?',
    opts: [
      'Use AWS SCT to convert the SQL Server schema before running DMS',
      'Run DMS directly without SCT because schema conversion is not needed for homogeneous migrations',
      'Use DMS Schema Conversion (built into DMS) for all object conversions',
      'Use AWS DataSync to replicate SQL Server data files to the RDS instance',
    ],
    a: 1,
    exp: 'For homogeneous migrations (same database engine on source and target), AWS SCT is not required because no schema conversion is needed — the schema can be exported and imported using native database tools. DMS is used to replicate data. SCT is only needed for heterogeneous migrations where the source and target engines differ.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company is migrating an on-premises MySQL database to Amazon Aurora MySQL. During the DMS full-load phase, they notice that foreign key constraints on the target are causing load failures. What is the recommended DMS setting?',
    opts: [
      'Set the target table preparation mode to "Drop tables on target" to reset constraints',
      'Disable foreign key checks on the target database during full load by using a DMS task setting',
      'Migrate tables in dependency order by manually specifying table order in DMS',
      'Switch to native mysqldump and restore instead of DMS for the initial full load',
    ],
    a: 1,
    exp: 'DMS provides a task setting to disable foreign key constraints on the target during the full-load phase (using "TargetMetadata.TargetSchema" and custom table mappings or using pre/post migration scripts). This prevents constraint violation errors during bulk load. After full load completes, constraints are re-enabled before CDC begins.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company needs to migrate a 200 TB on-premises Oracle database to Amazon RDS. The available internet bandwidth is 1 Gbps. Given network transfer constraints, what is the recommended migration approach?',
    opts: [
      'Use AWS DMS over the internet; at 1 Gbps it will complete in under 24 hours',
      'Use AWS Direct Connect to increase bandwidth, then run DMS full load',
      'Use AWS Snowball Edge to physically ship the initial dataset and use DMS CDC for ongoing changes',
      'Use S3 Transfer Acceleration with DMS to speed up the network transfer',
    ],
    a: 2,
    exp: 'At 1 Gbps, transferring 200 TB over the internet would take approximately 18+ days (theoretical max), making it impractical. AWS Snowball Edge is used for large physical data transfers — you load the full data export onto Snowball Edge, ship it to AWS, and then use DMS CDC to catch up only the delta changes since the export. This dramatically reduces the network-dependent portion of the migration.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company wants to perform a major version upgrade of their Amazon RDS for MySQL 5.7 database to MySQL 8.0 with the ability to immediately roll back if the upgrade causes application issues. Which approach enables quick rollback?',
    opts: [
      'Perform an in-place upgrade on the existing RDS instance and restore from the automated snapshot if needed',
      'Use RDS Blue/Green Deployments to create a green environment running MySQL 8.0, test it, then switch over or roll back',
      'Create a read replica, upgrade the replica to MySQL 8.0, then promote it',
      'Take a manual snapshot, upgrade the RDS instance, and restore the snapshot if rollback is needed',
    ],
    a: 1,
    exp: 'RDS Blue/Green Deployments create a staging (green) environment that mirrors the production (blue) environment. The green environment can be upgraded and tested while production continues running. During switchover, the roles flip and the original blue environment is retained for a period, enabling instant rollback. In-place upgrades and read replica promotions do not provide easy switchover.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company uses AWS DMS to migrate data from an on-premises PostgreSQL database to Amazon Aurora PostgreSQL. The SCT assessment report shows that 95% of the code is automatically converted and 5% requires manual remediation. The 5% consists of custom procedural language extensions. What should the team do about the 5%?',
    opts: [
      'Exclude the 5% from migration since SCT cannot convert it',
      'Manually rewrite the unconverted code in PL/pgSQL after reviewing the SCT action items',
      'Use a DMS transformation rule to skip the unconverted objects during migration',
      'Re-run SCT with the "aggressive conversion" flag to force conversion of the remaining 5%',
    ],
    a: 1,
    exp: 'SCT generates detailed action items and conversion reports that identify code it cannot automatically convert. The database team must manually review these action items and rewrite the unconverted database objects (stored procedures, functions, triggers) in the target dialect. SCT does not have an "aggressive conversion" flag, and excluding objects would leave the migration incomplete.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company wants to create a production-identical copy of their Aurora cluster for load testing without impacting the production cluster and without duplicating storage costs. Which Aurora feature should they use?',
    opts: [
      'Create a read replica of the Aurora cluster and promote it for testing',
      'Take a manual snapshot and restore it as a new cluster',
      'Use Aurora Clone to create a zero-copy clone of the cluster',
      'Use Aurora Global Database to create a secondary cluster for testing',
    ],
    a: 2,
    exp: 'Aurora Clone uses a copy-on-write protocol to create a new database cluster that initially shares storage pages with the source cluster. No data is physically copied until pages are modified, so it is fast and storage-efficient. Restoring a snapshot creates a full independent copy which takes time and incurs full storage costs for the cloned data.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company is running RDS for MySQL in a single Availability Zone. To improve availability to survive AZ failures, they enable Multi-AZ. What happens to the existing database during the Multi-AZ conversion?',
    opts: [
      'The database is unavailable for the entire duration while the standby is provisioned',
      'RDS creates a synchronous standby replica in another AZ; there may be a brief outage during the final sync',
      'RDS instantly enables Multi-AZ with no performance impact and no downtime',
      'Multi-AZ requires creating a new DB instance and migrating data using DMS',
    ],
    a: 1,
    exp: 'When you enable Multi-AZ on an existing Single-AZ RDS instance, AWS creates a standby replica and synchronizes it. During this process there may be a brief I/O suspension or performance degradation. The final cutover to Multi-AZ may involve a brief outage. This is significantly different from creating a new instance or using DMS — it is an in-place conversion.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company needs cross-region disaster recovery for their RDS for PostgreSQL database. They want the recovery point objective (RPO) to be under 5 minutes and the recovery time objective (RTO) to be under 1 hour. Which RDS feature should they implement?',
    opts: [
      'Enable automated backups and copy snapshots to the DR region daily',
      'Create a cross-region read replica in the DR region',
      'Enable Multi-AZ in the primary region only',
      'Use AWS Backup to copy RDS backups to the DR region hourly',
    ],
    a: 1,
    exp: 'A cross-region RDS read replica replicates asynchronously to another region, typically achieving RPO of seconds to a few minutes depending on write volume. In a DR event, the read replica can be promoted to a standalone primary in under an hour. Daily snapshot copies cannot meet a 5-minute RPO. Multi-AZ only protects against AZ failures within a region, not regional failures.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'An organization is using DMS to perform a CDC-based ongoing replication from an on-premises Oracle database to Amazon S3 (for a data lake). The DMS task fails intermittently, citing a "supplemental logging" error. What must be configured on the Oracle source?',
    opts: [
      'Enable Oracle Archive Log mode and ALL column supplemental logging',
      'Grant the DMS replication user DBA privileges on the source',
      'Configure Oracle Streams on the source database',
      'Enable Oracle GoldenGate on the source for CDC compatibility',
    ],
    a: 0,
    exp: 'For DMS to capture changes from Oracle using CDC (LogMiner), Oracle must be configured in Archive Log mode and supplemental logging must be enabled (at minimum ALL COLUMNS supplemental logging for the tables being replicated). Without supplemental logging, Oracle redo logs do not contain the before-images needed for DMS change capture.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company wants to test DMS replication performance before committing to a full production migration. They need to understand how long the full load will take and whether CDC keeps up with transaction volume. Which DMS feature provides this assessment?',
    opts: [
      'Run a DMS task in "verify only" mode to count rows without copying data',
      'Use AWS SCT to generate a performance assessment report for DMS tasks',
      'Create a DMS replication task with a small table subset and extrapolate the results',
      'Use the DMS Fleet Advisor to assess source database workload and migration feasibility',
    ],
    a: 3,
    exp: 'AWS DMS Fleet Advisor is a tool that analyzes on-premises databases, assesses their schemas and workloads, and provides migration recommendations including estimated migration complexity and effort. It helps plan DMS tasks before committing to a full migration. SCT is for schema conversion, not DMS performance assessment.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company is performing a heterogeneous database migration from Microsoft SQL Server to Amazon Aurora PostgreSQL using AWS DMS and SCT. After running SCT, the team finds that SQL Server-specific features like IDENTITY columns, TOP clauses, and GETDATE() functions need to be converted. How does SCT handle these?',
    opts: [
      'SCT leaves all SQL Server-specific syntax unchanged and the team must rewrite everything manually',
      'SCT automatically converts most SQL Server-specific functions and syntax to their PostgreSQL equivalents and flags the rest for manual review',
      'SCT converts IDENTITY columns but cannot convert any SQL Server functions',
      'DMS handles all syntax conversion automatically during data migration without needing SCT',
    ],
    a: 1,
    exp: 'AWS SCT automatically converts many SQL Server-specific constructs (IDENTITY → SERIAL/GENERATED, TOP → LIMIT, GETDATE() → CURRENT_TIMESTAMP) to PostgreSQL equivalents. Complex objects that cannot be automatically converted are flagged with action items for manual remediation. DMS handles data movement only; schema and code conversion is SCT\'s responsibility.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company needs to replicate their on-premises MySQL database continuously to Amazon Aurora MySQL with sub-second replication lag. The source must remain the production system with no downtime, and the target Aurora cluster must be ready to take over within minutes. Which approach achieves this?',
    opts: [
      'Use AWS DataSync to continuously sync MySQL data files from on-premises to Aurora',
      'Set up Aurora as an external read replica of the on-premises MySQL using native MySQL replication (GTID-based)',
      'Use DMS full-load-and-CDC task and promote Aurora when ready',
      'Manually take daily mysqldump exports and restore them to Aurora',
    ],
    a: 2,
    exp: 'DMS full-load-and-CDC is the standard AWS approach for continuous replication: DMS first migrates all existing data, then switches to CDC mode to replicate ongoing changes with low latency. When the team is ready to cut over, they stop writes on the source, let DMS flush remaining changes, and then promote Aurora as the new primary. Native MySQL replication to Aurora is also possible but requires more manual setup and is less straightforward in hybrid environments.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company completed an RDS Multi-AZ failover test and noticed the failover took 90 seconds. Which factors contribute to RDS Multi-AZ failover duration, and which step adds the most time?',
    opts: [
      'The primary instance writes a failover flag to S3, which takes 90 seconds to propagate',
      'RDS must snapshot the primary, restore on the standby, and promote it — all adding up to 90 seconds',
      'Detection of the primary failure, DNS TTL propagation, and completing in-flight transactions on the standby all contribute, with DNS propagation often the largest factor',
      'The standby must replay all WAL logs from the primary before accepting connections, which takes 90 seconds',
    ],
    a: 2,
    exp: 'RDS Multi-AZ failover involves: failure detection (typically 10–30 seconds), promotion of the standby (fast, as it is synchronously replicated), and DNS TTL-based endpoint propagation. DNS propagation can take 60–120 seconds depending on client-side caching. Applications should use JDBC/driver connection retry logic and low DNS TTL settings to minimize failover impact.',
  },

  // ─── Management & Operations (~13 questions) ─────────────────────────────

  {
    domain: 'Management & Operations',
    q: 'An RDS for MySQL instance is running out of storage. The database administrator wants to avoid future storage outages without manually monitoring and resizing storage. Which RDS feature should they enable?',
    opts: [
      'Provision 5x the current storage to provide a large buffer',
      'Enable RDS Storage Auto Scaling with a maximum storage threshold',
      'Set up a CloudWatch alarm on FreeStorageSpace and manually resize when triggered',
      'Migrate to Aurora, which has auto-expanding storage up to 128 TiB',
    ],
    a: 1,
    exp: 'RDS Storage Auto Scaling automatically increases storage capacity when free storage falls below a threshold, up to a configurable maximum. This eliminates the need for manual monitoring and resizing. While Aurora also auto-scales storage, migrating to Aurora is a larger change — RDS Storage Auto Scaling solves the problem for existing RDS instances without migration.',
  },
  {
    domain: 'Management & Operations',
    q: 'A DBA needs to change a MySQL parameter that requires a database restart (e.g., innodb_buffer_pool_size) on an RDS for MySQL instance. What is the correct way to apply this change in RDS?',
    opts: [
      'Connect to the instance via SSH and edit /etc/my.cnf directly, then restart mysqld',
      'Modify the parameter in the RDS parameter group; the change will apply at the next maintenance window if it is a static parameter, or immediately if it is dynamic',
      'Modify the parameter in the RDS parameter group and immediately reboot the DB instance to apply static parameter changes',
      'Create a new RDS instance with the correct parameter group and migrate data using DMS',
    ],
    a: 2,
    exp: 'In RDS, database parameters are managed via parameter groups — you cannot directly edit OS-level configuration files. For static parameters (those requiring a restart like innodb_buffer_pool_size), you must modify the parameter group AND manually reboot the DB instance for the change to take effect. Dynamic parameters apply immediately without a reboot.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company uses Amazon Aurora MySQL and wants to enable features not available via standard Aurora configuration, such as SSL certificate validation and specific audit logging modes. Which RDS concept allows adding these types of features?',
    opts: [
      'DB parameter groups, which hold all engine configuration',
      'DB option groups, which enable additional features (options) for supported engines',
      'DB cluster parameter groups, which apply Aurora-specific cluster-level settings',
      'Aurora custom endpoints, which route to instances with specific configurations',
    ],
    a: 1,
    exp: 'DB option groups allow you to enable additional features (options) for specific database engines, such as Oracle TDE, SQL Server Native Backup/Restore, MySQL audit plugins, and Memcached add-on. Parameter groups control engine configuration parameters. Note: for Aurora, most features are controlled via cluster parameter groups rather than option groups, but option groups are the correct concept for the described use case on MySQL/RDS.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company runs a DynamoDB table with provisioned capacity. Traffic follows a predictable daily pattern — high during business hours and low at night. They want to automatically adjust capacity to match demand and avoid over-provisioning. Which feature should they use?',
    opts: [
      'Switch to DynamoDB on-demand mode to avoid capacity planning entirely',
      'Enable DynamoDB Auto Scaling with target utilization tracking for read and write capacity',
      'Manually update provisioned capacity every hour using a scheduled Lambda function',
      'Use DynamoDB DAX to absorb traffic spikes without changing capacity',
    ],
    a: 1,
    exp: 'DynamoDB Auto Scaling uses Application Auto Scaling to automatically adjust provisioned read and write capacity based on observed traffic patterns and a target utilization percentage. It is ideal for predictable, variable workloads. On-demand mode is better for unpredictable workloads but may cost more for steady, predictable patterns. DAX reduces read load but does not manage write capacity.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company needs to share an encrypted RDS for PostgreSQL snapshot with another AWS account for disaster recovery purposes. What steps are required?',
    opts: [
      'Encrypted snapshots can be shared directly with another account; no additional steps are needed',
      'First copy the snapshot using the target account\'s KMS key, then share the re-encrypted copy with the target account',
      'Share the KMS customer managed key (CMK) with the target account, grant the target account permission to use the CMK, then share the encrypted snapshot',
      'Decrypt the snapshot first, share the unencrypted snapshot, and the target account re-encrypts after restoring',
    ],
    a: 2,
    exp: 'To share an encrypted RDS snapshot with another AWS account: (1) share the KMS customer managed key (CMK) used to encrypt the snapshot with the target account by updating the key policy, (2) share the encrypted snapshot with the target account. The target account can then copy the snapshot using their own KMS key before restoring. Sharing the snapshot alone is insufficient without also sharing the encryption key.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company wants their RDS for MySQL instances to automatically receive minor version upgrades (e.g., from 8.0.28 to 8.0.32) as AWS releases them. How should they configure this?',
    opts: [
      'Enable "Auto minor version upgrade" on the DB instance; upgrades apply automatically during the maintenance window',
      'Enable "Auto minor version upgrade" on the DB instance; upgrades apply immediately when released, regardless of maintenance window',
      'Create an EventBridge rule to trigger a Lambda function that applies upgrades via the RDS API',
      'Minor version upgrades on RDS always require a manual action from the console or CLI',
    ],
    a: 0,
    exp: 'RDS provides an "Auto minor version upgrade" option per DB instance. When enabled, AWS automatically applies approved minor version upgrades during the configured maintenance window. Upgrades do not apply immediately upon release — they respect the maintenance window schedule, minimizing unplanned disruption.',
  },
  {
    domain: 'Management & Operations',
    q: 'An Aurora cluster has one writer instance and three reader instances. A company wants to scale the cluster vertically (change instance class from db.r5.large to db.r5.xlarge) for the writer. What is the expected impact during this operation?',
    opts: [
      'No downtime; Aurora live migrates the writer to the new instance class transparently',
      'A brief failover occurs where Aurora promotes a reader to writer; typical downtime is under 30 seconds',
      'The entire cluster (writer and all readers) is unavailable during the instance class change',
      'Only the readers are restarted; the writer continues serving traffic throughout the change',
    ],
    a: 1,
    exp: 'Modifying the Aurora writer instance class triggers a brief failover: Aurora promotes one of the existing reader instances to become the new writer on the target instance class, and the original writer is replaced. This process typically takes under 30 seconds. The cluster remains available through the readers for read traffic during the failover.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company runs ElastiCache for Redis. They need to scale up (increase memory/CPU) for their primary shard during a traffic spike with minimal disruption. Which scaling approach is appropriate for Redis cluster mode disabled?',
    opts: [
      'Horizontal scaling by adding shards to the cluster',
      'Vertical scaling by modifying the node type; ElastiCache performs a rolling replacement with minimal disruption',
      'Horizontal scaling by adding read replicas to the existing shard',
      'Redis cluster mode disabled cannot be scaled; they must migrate to cluster mode enabled first',
    ],
    a: 1,
    exp: 'For ElastiCache Redis with cluster mode disabled (single shard), vertical scaling (changing node type) is the method to increase CPU and memory. ElastiCache performs this with minimal disruption by first scaling the replicas to the new node type and then doing a primary failover to the new node type. Horizontal sharding requires cluster mode enabled.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company uses RDS Custom for Oracle to support OS-level customizations. A DBA installs a custom agent on the underlying EC2 instance of the RDS Custom instance. The DBA then notices that RDS Custom has automatically reverted the custom agent. Why did this happen?',
    opts: [
      'RDS Custom automatically removes any software not installed through the RDS console',
      'RDS Custom monitors the instance for configuration drift and may revert changes that violate its operational model; the agent must be installed using a supported method or the automation must be paused',
      'The DBA used the wrong IAM role, causing automatic rollback by AWS Config',
      'Custom agents are blocked by RDS Custom security groups by default',
    ],
    a: 1,
    exp: 'RDS Custom uses automation to maintain the integrity of the managed environment. If you make changes that drift from the expected configuration, RDS Custom may trigger automatic remediation, reverting those changes. To install custom software, you should either pause RDS Custom automation (using the "Pause" setting) before making changes or use the approved RDS Custom automation integration patterns.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company wants to configure their DynamoDB table to use on-demand capacity mode instead of provisioned capacity. When is on-demand mode the BEST choice compared to provisioned with auto scaling?',
    opts: [
      'When the workload is highly predictable and steady, to minimize costs',
      'When the workload traffic is completely unpredictable, spiky, or new and you cannot estimate capacity needs',
      'When you need single-digit millisecond latency, which only on-demand mode guarantees',
      'When you need DynamoDB Streams enabled, which requires on-demand mode',
    ],
    a: 1,
    exp: 'DynamoDB on-demand mode is ideal for unpredictable, spiky, or new workloads where traffic patterns cannot be forecasted and you want to avoid throttling. For predictable workloads, provisioned capacity with auto scaling is typically more cost-effective. Latency and Streams availability are the same regardless of capacity mode.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company uses Aurora MySQL. They want to ensure that their automated backups are retained for 35 days. Is this possible with Aurora, and if not, what is the maximum retention period?',
    opts: [
      'Aurora supports automated backup retention of up to 35 days',
      'Aurora automated backup retention is limited to 35 days maximum, so 35 days is achievable',
      'Aurora automated backup retention is limited to 35 days; use manual snapshots for longer retention',
      'Aurora automated backups are retained for 1 to 35 days; 35 days is the maximum for automated backups',
    ],
    a: 3,
    exp: 'Amazon Aurora (and RDS) automated backup retention can be set from 1 to 35 days. Setting it to 35 days is valid and supported. For retention beyond 35 days, you must use manual DB cluster snapshots, which are retained until explicitly deleted. So a 35-day requirement can be met with automated backups alone.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company needs to upgrade their Amazon RDS for PostgreSQL instance from version 13 to version 15 (a major version upgrade). They want to validate that the application works correctly on version 15 before completing the upgrade. What is the AWS-recommended approach?',
    opts: [
      'Upgrade the production instance directly to version 15 and roll back using a snapshot if issues occur',
      'Create a read replica, upgrade the replica to version 15, run validation tests, then promote the replica',
      'Use RDS Blue/Green Deployments to create a version 15 clone, test it, and switch over when ready',
      'Take a manual snapshot, restore it as a new instance running version 15, test, then perform the in-place upgrade on production',
    ],
    a: 2,
    exp: 'RDS Blue/Green Deployments is designed for exactly this scenario: it creates a staging (green) environment, applies the major version upgrade, keeps it synchronized with the production (blue) environment via replication, and allows testing before a fast switchover. This minimizes risk with quick rollback capability. Creating a read replica cannot support major version upgrades through promotion alone.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company has multiple RDS DB instances in different AWS accounts. They want a centralized backup solution that enforces backup retention policies across all accounts and prevents deletion of backups for compliance. Which AWS service fulfills this requirement?',
    opts: [
      'Amazon Data Lifecycle Manager (DLM) with cross-account snapshot sharing',
      'AWS Backup with backup vaults and vault lock policies enforced centrally through AWS Organizations',
      'RDS automated backups with cross-account snapshot copy policies',
      'Amazon EventBridge rules that trigger Lambda to copy RDS snapshots across accounts',
    ],
    a: 1,
    exp: 'AWS Backup integrates with AWS Organizations to centrally manage backup policies across accounts. Backup vault lock (using WORM — Write Once Read Many) prevents backup deletion even by administrators, meeting compliance requirements. DLM manages EBS snapshots but has limited RDS backup management. Lambda-based solutions are manual and do not enforce immutable retention.',
  },

  // ─── Monitoring & Troubleshooting (~13 questions) ────────────────────────

  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A DBA notices that an RDS for MySQL instance has high CPU and slow query response times. They want to identify which SQL queries are consuming the most database time and what wait events are causing slowness. Which AWS feature provides this level of SQL-level visibility?',
    opts: [
      'Amazon CloudWatch metrics (CPUUtilization, ReadLatency, WriteLatency)',
      'RDS Enhanced Monitoring, which shows OS-level metrics including CPU per process',
      'RDS Performance Insights with the "Top SQL" and "Database Load by Wait" views',
      'RDS slow query log exported to CloudWatch Logs',
    ],
    a: 2,
    exp: 'RDS Performance Insights provides a dashboard showing Database Load (measured in Average Active Sessions), broken down by wait events, SQL statements, hosts, and users. The "Top SQL" view identifies the specific queries consuming the most database time. CloudWatch gives instance-level metrics, Enhanced Monitoring gives OS metrics, and slow query logs require manual analysis.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company uses RDS Enhanced Monitoring on their RDS for PostgreSQL instance. What type of metrics does Enhanced Monitoring provide that standard CloudWatch RDS metrics do not?',
    opts: [
      'Database-level metrics such as active connections, transactions per second, and lock wait times',
      'Operating system-level metrics (CPU per process, memory breakdown, disk I/O, network) collected at intervals as low as 1 second',
      'Aurora storage I/O metrics including read/write IOPS per Aurora storage node',
      'Application-level metrics collected from the PostgreSQL pg_stat_activity view',
    ],
    a: 1,
    exp: 'RDS Enhanced Monitoring uses an agent on the DB instance host to collect OS-level metrics including CPU usage by process, memory, file system usage, and network I/O at intervals as low as 1 second. Standard CloudWatch RDS metrics are collected from the hypervisor and represent instance-level aggregates. Enhanced Monitoring is essential for diagnosing OS-level resource contention.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A DynamoDB table experiences throttling on certain partition keys during peak hours. A database administrator wants to identify exactly which partition keys are receiving the most traffic to diagnose hot partitions. Which DynamoDB feature enables this analysis?',
    opts: [
      'DynamoDB CloudWatch Contributor Insights for DynamoDB',
      'DynamoDB Streams with Lambda to count per-key write events',
      'Amazon CloudWatch Logs Insights on DynamoDB request logs',
      'AWS X-Ray tracing on the DynamoDB table',
    ],
    a: 0,
    exp: 'CloudWatch Contributor Insights for DynamoDB automatically identifies the most accessed and throttled partition keys in a DynamoDB table or GSI. It provides ranked lists of the top contributors to traffic, making it the ideal tool for diagnosing hot partition issues without building custom logging infrastructure.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company\'s Aurora MySQL cluster is experiencing intermittent query timeouts. The DBA wants to view the execution plan and check for full table scans on queries that take more than 5 seconds. Which approach should they use?',
    opts: [
      'Enable RDS Performance Insights and filter by queries with high DB Load',
      'Enable the slow query log on the Aurora cluster with long_query_time=5 and publish logs to CloudWatch Logs',
      'Configure AWS X-Ray on the application to trace all queries over 5 seconds',
      'Use DynamoDB CloudWatch Contributor Insights (adapted for Aurora)',
    ],
    a: 1,
    exp: 'Enabling the MySQL slow query log with long_query_time=5 captures all queries that take longer than 5 seconds. Publishing these logs to CloudWatch Logs allows searching and analysis. The DBA can then run EXPLAIN on identified slow queries to check for full table scans. Performance Insights is also valuable but the slow query log is the direct way to capture queries exceeding a specific time threshold.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company monitors their ElastiCache for Redis cluster. They observe that the "Evictions" CloudWatch metric is increasing rapidly. What does a high eviction rate indicate, and what is the appropriate remediation?',
    opts: [
      'High evictions mean the cache is working correctly — old data is being removed to make room for new hot data',
      'High evictions indicate the cache is running out of memory; scale up the node type or add replicas to distribute reads',
      'High evictions indicate network saturation; increase the number of connections allowed',
      'High evictions mean the maxmemory-policy is set incorrectly; change it to noeviction to stop evictions',
    ],
    a: 1,
    exp: 'A high eviction rate in ElastiCache for Redis indicates that the cache is full and Redis is evicting keys to make room for new data, which reduces cache hit ratios and can degrade application performance. The remedy is to scale up to a larger node type (more memory) or shard the data across more nodes. Setting the policy to noeviction would cause write failures instead, which is worse.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A database administrator notices that an RDS for PostgreSQL instance has a FreeStorageSpace CloudWatch metric that is declining rapidly. They also observe that autovacuum is running frequently. What is the most likely cause and remediation?',
    opts: [
      'A runaway INSERT workload is filling the disk; increase provisioned storage or enable storage auto scaling',
      'Bloat from dead tuples accumulating due to high UPDATE/DELETE volume; autovacuum should reclaim space but a manual VACUUM FULL may be needed for severe bloat',
      'PostgreSQL WAL logs are filling the disk; increase the rds.wal_compression parameter to reduce WAL size',
      'The FreeStorageSpace metric is unreliable for PostgreSQL; ignore it and monitor pg_database_size() instead',
    ],
    a: 1,
    exp: 'In PostgreSQL, high UPDATE/DELETE activity generates dead tuples (table bloat). Autovacuum reclaims dead tuple space for reuse within the table but does not necessarily return space to the OS. If bloat is severe, FreeStorageSpace can decline while autovacuum runs. VACUUM FULL physically reclaims space but requires a table lock. For RDS, pg_repack or increasing storage are common remediation options.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company uses Aurora PostgreSQL with Performance Insights enabled. The DBLoad metric is consistently above the vCPU count (number of vCPUs on the instance). The top wait event shown is "IO:DataFileRead". What does this indicate?',
    opts: [
      'The database is CPU-bound; upgrade to an instance with more vCPUs',
      'The database is I/O-bound; queries are waiting for data to be read from disk into the buffer pool, suggesting insufficient buffer cache or full table scans',
      'Network latency between the Aurora storage layer and the instance is causing delays',
      'The Performance Insights agent is consuming vCPUs, inflating the DBLoad metric artificially',
    ],
    a: 1,
    exp: 'The IO:DataFileRead wait event (LWLock:BufferMapping on older versions) indicates that sessions are waiting for data pages to be read from storage into the shared buffer cache. This means the working set exceeds the in-memory buffer cache, causing excessive physical I/O. Remediation includes increasing the instance size (more RAM = larger shared_buffers), adding read replicas to distribute load, or optimizing queries to reduce data scanned.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company\'s RDS for MySQL Multi-AZ instance experienced an unexpected failover at 2:00 AM. The on-call engineer wants to determine the root cause of the failover. Where should they look first?',
    opts: [
      'CloudWatch metrics for CPUUtilization and FreeStorageSpace at 2:00 AM',
      'RDS Events in the console or via the AWS CLI (describe-events), which log failover causes',
      'The MySQL error log exported to CloudWatch Logs',
      'AWS CloudTrail for API calls that may have triggered the failover',
    ],
    a: 1,
    exp: 'RDS Events record important lifecycle events including failover events, with the reason for the failover (e.g., host replacement, storage failure, user-initiated reboot with failover). The Events log should be the first place to check. CloudWatch metrics show performance data, and MySQL error logs may have database-level errors, but the failover cause is captured in RDS Events.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A DBA is troubleshooting high ReplicationLag on an Aurora MySQL read replica. The lag is consistently above 5 seconds during business hours. What are the most likely causes?',
    opts: [
      'The primary writer is performing too many reads, starving replica threads',
      'Large transactions or long-running DDL statements on the primary cause replica lag; also, the replica instance type may be too small to keep up with write throughput',
      'Aurora read replicas always have at least 5 seconds of lag by design',
      'The read replica is located in a different region, causing network latency',
    ],
    a: 1,
    exp: 'Aurora replica lag increases when: the primary processes large transactions or bulk writes that take time to apply on replicas, or when the replica instance type has insufficient compute to apply changes as fast as they are generated. Aurora read replicas typically have very low lag (milliseconds) for normal workloads — consistent 5-second lag during business hours suggests either heavy write pressure or an undersized replica instance.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company wants to set up proactive alerts for their DynamoDB table when the consumed read capacity approaches the provisioned limit. Which CloudWatch metric and threshold combination should they use?',
    opts: [
      'Monitor the ReadThrottleEvents metric; alert when it is greater than 0',
      'Monitor the ConsumedReadCapacityUnits metric and calculate utilization as a percentage of ProvisionedReadCapacityUnits; alert when utilization exceeds 80%',
      'Monitor the SystemErrors metric; alert when it exceeds 10',
      'Monitor the SuccessfulRequestLatency metric; high latency indicates capacity pressure',
    ],
    a: 1,
    exp: 'The proactive approach is to monitor ConsumedReadCapacityUnits relative to ProvisionedReadCapacityUnits to calculate capacity utilization percentage and alert before throttling occurs (e.g., at 80%). Alerting on ReadThrottleEvents is reactive — throttling has already occurred by that point. SystemErrors and latency metrics do not directly indicate capacity limits.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A DBA wants to identify which user accounts are running the most resource-intensive queries on an RDS for PostgreSQL instance using Performance Insights. Which dimension in the Performance Insights "Database Load" chart should they select?',
    opts: [
      'Wait events',
      'Top SQL',
      'Hosts',
      'Users',
    ],
    a: 3,
    exp: 'Performance Insights allows slicing the Database Load metric by multiple dimensions: SQL (top queries), Wait Events (what queries are waiting on), Hosts (which application servers), and Users (which database users). Selecting the "Users" dimension shows which database users are generating the most Database Load, helping identify problematic user accounts or application connections.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company notices that their ElastiCache for Redis "CacheHitRate" metric has dropped from 95% to 60% over the past week. What are the most likely causes of this drop?',
    opts: [
      'The Redis version was automatically upgraded, changing the default eviction policy',
      'Application traffic patterns changed (new queries hitting uncached keys), the cache size is insufficient causing evictions, or TTLs are set too low causing frequent cache misses',
      'ElastiCache maxconnections was reached, causing connection failures that are counted as cache misses',
      'The CloudWatch metric for CacheHitRate is calculated incorrectly for cluster mode enabled configurations',
    ],
    a: 1,
    exp: 'A declining cache hit rate typically indicates one or more of: changed access patterns with new keys not yet in cache, insufficient cache memory causing high eviction rates (items expire before being reused), TTL settings too aggressive, or cache cold starts after a restart. Investigating the Evictions metric alongside CacheHitRate helps distinguish between these causes.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company running Aurora MySQL wants to automatically receive notifications when the database runs out of storage space or when a failover occurs. Which AWS service should they use to configure these notifications?',
    opts: [
      'AWS CloudTrail with SNS notification on RDS API calls',
      'Amazon CloudWatch Alarms with SNS topic for the FreeStorageSpace metric, and RDS Event Subscriptions for failover events',
      'AWS Config rules to detect when Aurora storage exceeds a threshold',
      'Amazon EventBridge with a scheduled rule to poll RDS storage metrics every minute',
    ],
    a: 1,
    exp: 'The correct approach combines two tools: CloudWatch Alarms monitor the FreeStorageSpace metric and send SNS notifications when it falls below a threshold; RDS Event Subscriptions capture Aurora lifecycle events (including failover events) and send notifications via SNS. Using both provides comprehensive alerting for operational and storage events.',
  },

  // ─── Database Security (~13 questions) ──────────────────────────────────

  {
    domain: 'Database Security',
    q: 'A company wants to enable IAM database authentication for their Amazon RDS for MySQL instance so that application users authenticate using IAM credentials instead of database passwords. Which steps are required?',
    opts: [
      'Create an IAM policy with rds-db:connect permission, attach it to the application IAM role, enable IAM authentication on the RDS instance, and create database users with AWSAuthenticationPlugin',
      'Enable IAM authentication on the RDS instance; existing MySQL users automatically switch to IAM authentication',
      'Deploy RDS Proxy in front of RDS, which handles IAM authentication transparently without any RDS configuration',
      'Create an IAM user for each database user and configure RDS to validate against IAM Users Service',
    ],
    a: 0,
    exp: 'To enable IAM database authentication for RDS MySQL: (1) enable IAM database authentication on the RDS instance, (2) create a database user with the AWSAuthenticationPlugin, (3) create an IAM policy granting rds-db:connect for the specific resource ARN, and (4) attach the policy to the application IAM role. The application then generates an authentication token using the IAM credentials.',
  },
  {
    domain: 'Database Security',
    q: 'A company wants to rotate the master password for their Amazon RDS for PostgreSQL instance automatically every 30 days without any application downtime. Which AWS service should they use?',
    opts: [
      'AWS KMS key rotation, which automatically rotates the RDS master password',
      'AWS Secrets Manager with a rotation Lambda function configured for RDS credentials',
      'AWS Systems Manager Parameter Store with a scheduled EventBridge rotation rule',
      'RDS native password rotation using the ModifyDBInstance API on a schedule',
    ],
    a: 1,
    exp: 'AWS Secrets Manager can store RDS credentials and automatically rotate them using a managed Lambda rotation function. Secrets Manager updates the secret value and simultaneously updates the RDS instance password, ensuring applications using Secrets Manager to retrieve credentials always get the current valid password without downtime. KMS key rotation rotates encryption keys, not database passwords.',
  },
  {
    domain: 'Database Security',
    q: 'A company is encrypting a new Amazon RDS for Oracle instance using AWS KMS. Which elements of the RDS instance are encrypted when encryption at rest is enabled?',
    opts: [
      'Only the data files are encrypted; log files and snapshots are not',
      'Data files, automated backups, read replicas, and snapshots are all encrypted using the specified KMS key',
      'Only the database volume is encrypted; automated backups are stored unencrypted',
      'All data is encrypted but read replicas use a separate automatically generated KMS key',
    ],
    a: 1,
    exp: 'When you enable RDS encryption at rest, all storage is encrypted including: the DB instance storage, automated backups, read replicas, and manual snapshots. The encryption is performed using the KMS key you specify. Read replicas inherit the same encryption configuration as the source. You cannot have an unencrypted read replica of an encrypted instance.',
  },
  {
    domain: 'Database Security',
    q: 'A company has an unencrypted RDS for MySQL production database that they need to encrypt for compliance reasons. What is the correct procedure?',
    opts: [
      'Enable encryption in the RDS console on the existing instance; RDS encrypts it in-place with a brief restart',
      'Take a snapshot of the unencrypted instance, create an encrypted copy of the snapshot, and restore from the encrypted snapshot',
      'Enable encryption via the AWS CLI using modify-db-instance with the --storage-encrypted flag; no downtime required',
      'Create an encrypted read replica of the unencrypted instance, then promote the read replica',
    ],
    a: 1,
    exp: 'RDS encryption cannot be enabled on an existing unencrypted instance in-place. The correct procedure is: (1) take a snapshot of the unencrypted instance, (2) create an encrypted copy of the snapshot using a KMS key, (3) restore a new DB instance from the encrypted snapshot. The original unencrypted instance can then be decommissioned. Note: you cannot create an encrypted read replica of an unencrypted source.',
  },
  {
    domain: 'Database Security',
    q: 'A company uses RDS Proxy in front of their Amazon Aurora MySQL cluster. The application connects to RDS Proxy using IAM authentication. What are the two primary benefits of using RDS Proxy in this scenario?',
    opts: [
      'RDS Proxy eliminates the need for a VPC and simplifies network security; and it caches query results to reduce Aurora load',
      'RDS Proxy provides connection pooling (reducing database connections) and enforces IAM authentication and Secrets Manager integration at the proxy level',
      'RDS Proxy enables cross-region failover and Aurora Serverless v2 integration',
      'RDS Proxy provides SSL termination and eliminates the need for VPC security groups',
    ],
    a: 1,
    exp: 'RDS Proxy provides two major benefits: (1) connection pooling — it maintains a pool of established connections to the database, allowing thousands of application connections to share a smaller number of actual database connections; (2) improved security through native IAM authentication and Secrets Manager integration, enabling credential rotation without application-level changes. It does not provide cross-region failover or query caching.',
  },
  {
    domain: 'Database Security',
    q: 'A security team requires that all connections to their Amazon RDS for PostgreSQL instance use SSL/TLS. How do they enforce this so that non-SSL connections are rejected?',
    opts: [
      'Modify the RDS security group to block non-SSL traffic on port 5432',
      'Set the rds.force_ssl parameter to 1 in the RDS parameter group associated with the instance',
      'Enable SSL in the RDS console under the "Security" tab; RDS automatically rejects non-SSL connections',
      'Deploy RDS Proxy and configure it to enforce SSL; the backend connection to RDS does not require SSL',
    ],
    a: 1,
    exp: 'For RDS PostgreSQL, setting the rds.force_ssl parameter to 1 in the DB parameter group configures PostgreSQL to reject all non-SSL connections. Clients must connect with SSL or the connection is denied. Security groups operate at the network layer and cannot distinguish SSL from non-SSL traffic on the same port. The parameter group approach is the correct RDS mechanism.',
  },
  {
    domain: 'Database Security',
    q: 'A company stores sensitive data in Amazon DynamoDB and needs to restrict individual IAM users from accessing specific items based on a "department" attribute (e.g., a user in HR can only access HR items). Which DynamoDB feature enables this?',
    opts: [
      'DynamoDB resource-based policies applied at the table level for each IAM user',
      'DynamoDB Fine-Grained Access Control (FGAC) using IAM condition keys (dynamodb:LeadingKeys and dynamodb:Attributes)',
      'DynamoDB VPC endpoints with endpoint policies restricting item-level access',
      'DynamoDB encryption with department-specific KMS keys for each item type',
    ],
    a: 1,
    exp: 'DynamoDB Fine-Grained Access Control (FGAC) uses IAM policy condition keys to restrict access to specific items or attributes. The dynamodb:LeadingKeys condition restricts access to items where the partition key matches a specific value (e.g., the user\'s department), and dynamodb:Attributes restricts which attributes can be accessed. This enables item-level and attribute-level authorization within IAM policies.',
  },
  {
    domain: 'Database Security',
    q: 'A company wants to prevent their DynamoDB table from being accessed over the public internet. All access must stay within the AWS network from their VPC. Which mechanism achieves this?',
    opts: [
      'Apply a DynamoDB resource-based policy to restrict access to the VPC CIDR range',
      'Create a VPC endpoint for DynamoDB (Gateway endpoint) and use an endpoint policy to restrict access to the DynamoDB table',
      'Deploy a NAT Gateway to route all DynamoDB traffic through private IP addresses',
      'Enable DynamoDB encryption with a VPC-restricted KMS key',
    ],
    a: 1,
    exp: 'A VPC Gateway Endpoint for DynamoDB routes traffic between the VPC and DynamoDB through the AWS network backbone without traversing the internet. An endpoint policy can further restrict which DynamoDB tables and actions are accessible through the endpoint. This ensures DynamoDB access stays within AWS without requiring internet gateways or NAT gateways.',
  },
  {
    domain: 'Database Security',
    q: 'An enterprise uses Oracle databases on RDS for Oracle with the Transparent Data Encryption (TDE) option. Which RDS feature enables Oracle TDE on RDS for Oracle?',
    opts: [
      'Enable encryption at rest using KMS when creating the RDS instance; this automatically enables Oracle TDE',
      'Add the TDE option to an RDS option group and associate the option group with the Oracle RDS instance',
      'Configure Oracle Wallet at the OS level by connecting to the RDS instance via SSH',
      'Oracle TDE is not supported on RDS for Oracle; use RDS encryption at rest instead',
    ],
    a: 1,
    exp: 'Oracle Transparent Data Encryption on RDS for Oracle is enabled through an RDS option group. You add the TDE option to an option group and associate that option group with your Oracle RDS instance. RDS encryption at rest (KMS) and Oracle TDE are separate features — RDS encryption is at the storage level, while TDE is at the database engine level. OS-level SSH access is not available on standard RDS.',
  },
  {
    domain: 'Database Security',
    q: 'A company has multiple microservices that connect to an Amazon Aurora cluster. Each microservice uses hardcoded database credentials in its configuration. A security audit requires eliminating hardcoded credentials and implementing automatic rotation. Which solution resolves this with minimal application code changes?',
    opts: [
      'Store credentials in AWS Systems Manager Parameter Store (standard tier) and update each service to call SSM at startup',
      'Use AWS Secrets Manager; store Aurora credentials in a secret with automatic rotation, and update each microservice to call the Secrets Manager API to retrieve credentials at runtime',
      'Implement IAM database authentication and update all microservices to generate IAM tokens instead of using passwords',
      'Use RDS Proxy with IAM authentication to abstract credentials from the microservices',
    ],
    a: 1,
    exp: 'AWS Secrets Manager is the recommended service for storing and automatically rotating database credentials. Microservices call the Secrets Manager API to retrieve the current credentials at runtime, eliminating hardcoded values. Secrets Manager has a native integration with RDS/Aurora for automatic rotation. IAM database authentication is also valid but requires application code changes to generate tokens rather than retrieve a static credential.',
  },
  {
    domain: 'Database Security',
    q: 'A company needs to audit all DDL statements (CREATE, ALTER, DROP) and DML statements (INSERT, UPDATE, DELETE) executed on their RDS for MySQL instance for compliance. How should they implement this?',
    opts: [
      'Enable AWS CloudTrail; it captures all SQL statements executed on RDS for MySQL',
      'Enable the MySQL general query log on RDS and publish it to CloudWatch Logs for long-term retention',
      'Use the MariaDB Audit Plugin via an RDS option group, which captures SQL statements and publishes them to CloudWatch Logs',
      'Deploy a database proxy that intercepts and logs all SQL statements before forwarding them to RDS',
    ],
    a: 2,
    exp: 'The MariaDB Audit Plugin (available for RDS for MySQL via an option group) captures DDL and DML statements and can publish audit logs to CloudWatch Logs for analysis and retention. CloudTrail captures RDS API calls (e.g., CreateDBInstance) but not SQL-level statements. The general query log captures all queries but has high performance overhead and is not recommended for production auditing.',
  },
  {
    domain: 'Database Security',
    q: 'A company uses RDS Proxy with Secrets Manager integration. The Aurora PostgreSQL master password is rotated automatically by Secrets Manager every 30 days. How does RDS Proxy handle the password rotation to avoid application disruption?',
    opts: [
      'RDS Proxy caches the old credentials for 30 days and only refreshes them when the cache expires',
      'Applications must be restarted after each Secrets Manager rotation to pick up the new credentials',
      'RDS Proxy automatically retrieves the updated credentials from Secrets Manager and updates its connection pool to the database transparently, with no application disruption',
      'RDS Proxy uses IAM authentication to Aurora, so Secrets Manager password rotation does not affect the proxy-to-database connection',
    ],
    a: 2,
    exp: 'RDS Proxy is integrated with Secrets Manager and automatically retrieves updated credentials after a rotation. The proxy updates its backend connections to Aurora using the new credentials seamlessly, with no connection interruptions for application clients. Applications connecting to RDS Proxy are completely shielded from the rotation process, making this an ideal architecture for credential rotation.',
  },
  {
    domain: 'Database Security',
    q: 'A security team wants to ensure that network traffic between an application running in an EC2 instance and an Amazon RDS for PostgreSQL database is private and does not traverse the internet. The EC2 instance and RDS are in the same VPC. What configuration ensures this?',
    opts: [
      'Configure an internet gateway and route table so that traffic uses private IP addressing',
      'Place both the EC2 instance and RDS instance in private subnets within the same VPC; traffic is automatically routed privately through the VPC',
      'Enable VPC Flow Logs to confirm that no internet traffic reaches the RDS instance',
      'Use AWS PrivateLink to create a private endpoint for RDS within the VPC',
    ],
    a: 1,
    exp: 'When both the EC2 instance and RDS instance are in private subnets within the same VPC, all traffic between them is routed through the VPC\'s internal network and never traverses the internet. Security groups control which EC2 instances can connect to the RDS security group on the database port. VPC Flow Logs provide visibility but do not control routing. PrivateLink is for cross-VPC or cross-account service access, not intra-VPC traffic.',
  },

  // ─── Additional questions to reach 70+ total ─────────────────────────────

  {
    domain: 'Workload-Specific Database Design',
    q: 'A company wants to model a knowledge graph in which entities (people, organizations, patents) and their relationships (WORKS_FOR, INVENTED, CITES) have properties. They need to run traversal queries like "find all patents invented by employees of company X within 2 hops." Which query language on Amazon Neptune is most appropriate for property graphs?',
    opts: [
      'SPARQL, which is designed for RDF triples and property graphs',
      'Gremlin, which is the standard graph traversal language for property graphs on Neptune',
      'Cypher, which is Neptune\'s native query language for property graphs',
      'SQL with recursive CTEs, available in Neptune via JDBC compatibility',
    ],
    a: 1,
    exp: 'Amazon Neptune supports two graph models: Property Graph (queried with Gremlin) and RDF (queried with SPARQL). For property graph traversals where vertices and edges have properties, Gremlin is the appropriate language. Neptune does not natively support Cypher (that is Neo4j\'s language), though openCypher support has been added in newer Neptune versions. SPARQL is for RDF semantic graphs.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'During a DMS migration task, the DBA notices that the task is in a "Failed" state with the error "Unable to connect to the source database." The source is an on-premises Oracle database. What should the DBA check first?',
    opts: [
      'Verify that the DMS replication instance security group allows outbound traffic to the source database IP and port, and that the source firewall allows inbound connections from the DMS replication instance',
      'Verify that AWS Direct Connect is configured for the on-premises network',
      'Check that the DMS task uses the correct table mapping rules to include the source schema',
      'Restart the DMS replication instance to refresh network connectivity',
    ],
    a: 0,
    exp: 'DMS connectivity failures to on-premises sources typically involve network configuration. The DBA should verify: (1) the DMS replication instance security group allows outbound connections to the source DB port, (2) the on-premises firewall allows inbound connections from the DMS replication instance\'s IP address on the Oracle listener port (typically 1521). Table mapping and instance restarts do not fix connectivity issues.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company uses AWS Backup to back up their Amazon RDS for MySQL instances. They want to ensure that backups cannot be deleted by anyone, including administrators, for 7 years to meet financial compliance regulations. Which AWS Backup feature enables this?',
    opts: [
      'Set the backup retention period to 2555 days (7 years) in the AWS Backup plan',
      'Enable AWS Backup Vault Lock in Compliance mode with a minimum retention of 7 years on the backup vault',
      'Use S3 Object Lock on the S3 bucket where RDS backups are stored',
      'Enable AWS Config to alert when backup retention falls below 7 years',
    ],
    a: 1,
    exp: 'AWS Backup Vault Lock in Compliance mode creates a WORM (Write Once Read Many) protection on the backup vault. Once configured, no one — including the root account — can delete backups or change the lock settings before the specified retention period expires. This is the correct mechanism for immutable, compliance-mandated backup retention. S3 Object Lock applies to S3 objects, not RDS automated backups.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A company runs AWS DMS for ongoing replication. After a weekend, they notice the DMS task has "replication lag" of several hours. The source database had heavy batch processing over the weekend. What is the most likely cause and fix?',
    opts: [
      'The DMS replication instance ran out of disk space for the change log; increase the replication instance storage',
      'Large batch transactions on the source generated more CDC changes than the DMS task could process; scale up the replication instance compute (instance class) to catch up',
      'The network connection between DMS and the source timed out; restart the DMS task from the last checkpoint',
      'CDC replication is paused during weekends by AWS to reduce costs; re-enable it on Monday',
    ],
    a: 1,
    exp: 'Heavy batch processing generates a large volume of CDC changes that can overwhelm a DMS replication instance. If the replication instance compute is insufficient to process changes as fast as they are generated, lag accumulates. Scaling up the DMS replication instance (larger instance class with more vCPUs and memory) allows it to process change data faster and catch up. Storage is less commonly the bottleneck than compute in this scenario.',
  },
  {
    domain: 'Database Security',
    q: 'A company is running Amazon Aurora PostgreSQL and needs to implement column-level security so that certain users cannot see the "salary" column in the employees table, while other users have full access. Which approach is correct within Aurora PostgreSQL?',
    opts: [
      'Use DynamoDB Fine-Grained Access Control to restrict column access in Aurora',
      'Create an IAM policy with dynamodb:Attributes condition to restrict column access',
      'Use PostgreSQL native GRANT/REVOKE commands to grant column-level SELECT privileges to specific roles, and create views for restricted users that exclude the salary column',
      'Enable AWS Lake Formation on the Aurora table to enforce column-level security',
    ],
    a: 2,
    exp: 'Aurora PostgreSQL supports standard PostgreSQL security features. You can use GRANT SELECT (column_name) to grant column-level privileges or REVOKE SELECT to remove them for specific roles. Creating views that exclude sensitive columns and granting access to the view (not the base table) is another common approach. IAM and Lake Formation control access at the AWS service level, not within the PostgreSQL database itself.',
  },
  {
    domain: 'Workload-Specific Database Design',
    q: 'A company is designing a multi-tenant SaaS application. Each tenant\'s data will be stored in DynamoDB. They use TenantID as the partition key. Some tenants are much larger than others and will generate significantly more reads and writes. What design consideration should the team apply?',
    opts: [
      'Use a single table with TenantID as the partition key; DynamoDB handles all traffic distribution automatically',
      'Implement write sharding for large tenants by appending a random suffix to TenantID to distribute writes across multiple partition key values',
      'Create a separate DynamoDB table for each large tenant to provide dedicated throughput',
      'Use DynamoDB on-demand mode, which automatically handles hot tenant partitions without any design changes',
    ],
    a: 1,
    exp: 'Large tenants (hot tenants) will cause hot partitions if all their traffic targets a single TenantID partition key. Write sharding — appending a random suffix (e.g., TenantID#1 through TenantID#N) — spreads their traffic across multiple partitions. Reads then use scatter-gather to retrieve and merge results. On-demand mode adjusts capacity but does not eliminate hot partition limitations at a per-partition level.',
  },
  {
    domain: 'Management & Operations',
    q: 'A company uses ElastiCache for Redis in cluster mode enabled with 3 shards. Read traffic is growing significantly. What is the best way to scale read capacity?',
    opts: [
      'Increase the node type of all primary nodes to handle more reads',
      'Add read replicas to each shard in the cluster; ElastiCache can support up to 5 replicas per shard',
      'Enable Redis Cluster mode disabled to consolidate all data into one shard for easier scaling',
      'Implement application-side consistent hashing to rebalance reads across existing nodes',
    ],
    a: 1,
    exp: 'In ElastiCache for Redis cluster mode enabled, each shard can have up to 5 read replicas. Adding replicas to existing shards increases read capacity by distributing read traffic across more nodes within each shard. This is the horizontal read scaling mechanism for Redis Cluster. Increasing node type (vertical scaling) improves single-node capacity but does not distribute read load.',
  },
  {
    domain: 'Deployment & Migration',
    q: 'A company uses AWS SCT to convert an Oracle database schema to Amazon Aurora PostgreSQL. SCT reports a conversion complexity of "High" for several Oracle packages containing complex PL/SQL logic. What does this rating imply?',
    opts: [
      'SCT will convert the package automatically but it will take longer due to the complexity',
      'The Oracle package cannot be migrated to Aurora PostgreSQL at all and must remain on Oracle',
      'Significant manual effort is required to rewrite the PL/SQL logic in PL/pgSQL; SCT cannot automatically convert it and provides guidance on required changes',
      'SCT will convert the package using a compatibility shim that emulates Oracle behavior transparently',
    ],
    a: 2,
    exp: 'A "High" complexity rating from SCT means the code contains Oracle-specific features that cannot be automatically converted to the target syntax. The team must manually rewrite these objects using target-database equivalents (e.g., PL/pgSQL for PostgreSQL). SCT generates detailed action items explaining what needs to change, but the actual rewriting is a manual engineering effort. SCT does not provide transparent Oracle-compatibility shims.',
  },
  {
    domain: 'Monitoring & Troubleshooting',
    q: 'A DBA is investigating why DynamoDB read latency has increased. SuccessfulRequestLatency in CloudWatch shows p99 latency has jumped from 2ms to 50ms. Which scenario most likely explains this increase?',
    opts: [
      'DynamoDB is throttling requests; check ConsumedReadCapacityUnits versus ProvisionedReadCapacityUnits',
      'The application switched from GetItem (point reads) to Scan operations, which read the entire table and have much higher latency',
      'DynamoDB is experiencing a regional service disruption; check the AWS Service Health Dashboard',
      'The DynamoDB table was accidentally changed to on-demand mode, which has higher latency than provisioned mode',
    ],
    a: 1,
    exp: 'A jump from 2ms to 50ms in DynamoDB read latency without throttling (check ConsumedReadCapacityUnits and ThrottledRequests metrics) often indicates a change in access patterns. Scan operations read every item in the table and have much higher latency than GetItem or Query operations. Reviewing application code changes and DynamoDB CloudWatch metrics (particularly the operation type breakdown) helps confirm this.',
  },
  {
    domain: 'Database Security',
    q: 'A company is implementing defense in depth for their RDS database tier. They want to ensure that even if the RDS security group is misconfigured to allow broad network access, the database cannot be accessed from outside the VPC. Which additional control achieves this?',
    opts: [
      'Enable Multi-AZ, which isolates the standby in a private subnet',
      'Deploy the RDS instance in a private subnet with no route to an internet gateway, and ensure the route table has no internet-facing routes',
      'Enable RDS encryption at rest to prevent data exfiltration even if network access is gained',
      'Use AWS WAF in front of the RDS instance to block unauthorized network traffic',
    ],
    a: 1,
    exp: 'Deploying RDS in a private subnet (no internet gateway route in the subnet route table) ensures that the database is not internet-routable even if a security group misconfiguration occurs. Network routing is a fundamental control independent of security group rules. Encryption at rest prevents data access if storage is physically compromised but does not protect against network access. WAF protects web applications, not database endpoints.',
  },

  // ── Additional DBS-C01 practice questions (49 added) ──

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "During a AWS Certified Database – Specialty readiness review at a regulated financial institution, which Workload-Specific Database Design approach meets certification objectives?",
    opts: [
      "Implement workload-specific database design without change management or rollback plans",
      "Follow industry best practices for workload-specific database design as defined in the AWS Certified Database – Specialty body of knowledge",
      "Use default workload-specific database design settings without hardening",
      "Centralize all workload-specific database design decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for workload-specific database design as defined in the AWS Certified Database – Specialty body of knowledge. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "A consultant advising a healthcare organization on AWS Certified Database – Specialty recommends improvements to Deployment & Migration. What should they implement?",
    opts: [
      "Use default deployment & migration settings without hardening",
      "Centralize all deployment & migration decisions without stakeholder review",
      "Implement the standard deployment & migration solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Deprecate deployment & migration controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard deployment & migration solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "Which Management & Operations strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Database – Specialty standards?",
    opts: [
      "Centralize all management & operations decisions without stakeholder review",
      "Deprecate management & operations controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses management & operations policies",
      "Use the certified management & operations methodology specified for AWS Certified Database – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified management & operations methodology specified for AWS Certified Database – Specialty candidates. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "An audit of a government agency reveals gaps in Monitoring & Troubleshooting for AWS Certified Database – Specialty. Which remediation is CORRECT?",
    opts: [
      "Adopt the monitoring & troubleshooting control framework referenced in AWS Certified Database – Specialty study materials",
      "Deprecate monitoring & troubleshooting controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses monitoring & troubleshooting policies",
      "Disable monitoring for monitoring & troubleshooting to improve performance",
    ],
    a: 0,
    exp: "Adopt the monitoring & troubleshooting control framework referenced in AWS Certified Database – Specialty study materials. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Database – Specialty study plan focused on Database Security. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses database security policies",
      "Configure database security according to AWS Certified Database – Specialty exam blueprint recommendations",
      "Disable monitoring for database security to improve performance",
      "Grant excessive privileges that violate database security least-privilege principles",
    ],
    a: 1,
    exp: "Configure database security according to AWS Certified Database – Specialty exam blueprint recommendations. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "When a manufacturing company modernizing IT implements AWS Certified Database – Specialty controls for Workload-Specific Database Design, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for workload-specific database design to improve performance",
      "Grant excessive privileges that violate workload-specific database design least-privilege principles",
      "Select the workload-specific database design option that meets AWS Certified Database – Specialty security and governance standards",
      "Rely solely on manual processes with no workload-specific database design automation",
    ],
    a: 2,
    exp: "Select the workload-specific database design option that meets AWS Certified Database – Specialty security and governance standards. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "A AWS Certified Database – Specialty practice exam scenario covers Deployment & Migration for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate deployment & migration least-privilege principles",
      "Rely solely on manual processes with no deployment & migration automation",
      "Ignore deployment & migration compliance requirements for faster deployment",
      "Design deployment & migration using patterns validated in AWS Certified Database – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design deployment & migration using patterns validated in AWS Certified Database – Specialty practice assessments. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "Which Management & Operations principle is emphasized in AWS Certified Database – Specialty when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Database – Specialty-aligned management & operations approach recommended in official exam objectives",
      "Rely solely on manual processes with no management & operations automation",
      "Ignore management & operations compliance requirements for faster deployment",
      "Mix production and test management & operations configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Database – Specialty-aligned management & operations approach recommended in official exam objectives. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "A regulated financial institution failed a mock AWS Certified Database – Specialty question on Monitoring & Troubleshooting. What concept should they review?",
    opts: [
      "Ignore monitoring & troubleshooting compliance requirements for faster deployment",
      "Follow industry best practices for monitoring & troubleshooting as defined in the AWS Certified Database – Specialty body of knowledge",
      "Mix production and test monitoring & troubleshooting configurations in one environment",
      "Store sensitive monitoring & troubleshooting credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for monitoring & troubleshooting as defined in the AWS Certified Database – Specialty body of knowledge. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "For AWS Certified Database – Specialty certification, Database Security knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test database security configurations in one environment",
      "Store sensitive database security credentials in plain text configuration files",
      "Implement the standard database security solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Skip database security testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard database security solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "A team at a high-traffic e-commerce platform debates Workload-Specific Database Design options while studying AWS Certified Database – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive workload-specific database design credentials in plain text configuration files",
      "Skip workload-specific database design testing before production rollout",
      "Implement workload-specific database design without change management or rollback plans",
      "Use the certified workload-specific database design methodology specified for AWS Certified Database – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified workload-specific database design methodology specified for AWS Certified Database – Specialty candidates. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "Which Deployment & Migration capability is validated by AWS Certified Database – Specialty for organizations such as a government agency?",
    opts: [
      "Adopt the deployment & migration control framework referenced in AWS Certified Database – Specialty study materials",
      "Skip deployment & migration testing before production rollout",
      "Implement deployment & migration without change management or rollback plans",
      "Use default deployment & migration settings without hardening",
    ],
    a: 0,
    exp: "Adopt the deployment & migration control framework referenced in AWS Certified Database – Specialty study materials. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "When evaluating Management & Operations tools for AWS Certified Database – Specialty, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement management & operations without change management or rollback plans",
      "Configure management & operations according to AWS Certified Database – Specialty exam blueprint recommendations",
      "Use default management & operations settings without hardening",
      "Centralize all management & operations decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure management & operations according to AWS Certified Database – Specialty exam blueprint recommendations. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "A manufacturing company modernizing IT must document Monitoring & Troubleshooting procedures for AWS Certified Database – Specialty compliance. Which standard applies?",
    opts: [
      "Use default monitoring & troubleshooting settings without hardening",
      "Centralize all monitoring & troubleshooting decisions without stakeholder review",
      "Select the monitoring & troubleshooting option that meets AWS Certified Database – Specialty security and governance standards",
      "Deprecate monitoring & troubleshooting controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the monitoring & troubleshooting option that meets AWS Certified Database – Specialty security and governance standards. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "A AWS Certified Database – Specialty instructor asks about Database Security in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all database security decisions without stakeholder review",
      "Deprecate database security controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses database security policies",
      "Design database security using patterns validated in AWS Certified Database – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design database security using patterns validated in AWS Certified Database – Specialty practice assessments. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "Which Workload-Specific Database Design metric best indicates AWS Certified Database – Specialty readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Database – Specialty-aligned workload-specific database design approach recommended in official exam objectives",
      "Deprecate workload-specific database design controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses workload-specific database design policies",
      "Disable monitoring for workload-specific database design to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Database – Specialty-aligned workload-specific database design approach recommended in official exam objectives. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "A regulated financial institution is troubleshooting a Deployment & Migration issue while preparing for AWS Certified Database – Specialty. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses deployment & migration policies",
      "Follow industry best practices for deployment & migration as defined in the AWS Certified Database – Specialty body of knowledge",
      "Disable monitoring for deployment & migration to improve performance",
      "Grant excessive privileges that violate deployment & migration least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for deployment & migration as defined in the AWS Certified Database – Specialty body of knowledge. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "In AWS Certified Database – Specialty, how should a healthcare organization handle a trade-off involving Management & Operations?",
    opts: [
      "Disable monitoring for management & operations to improve performance",
      "Grant excessive privileges that violate management & operations least-privilege principles",
      "Implement the standard management & operations solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Rely solely on manual processes with no management & operations automation",
    ],
    a: 2,
    exp: "Implement the standard management & operations solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "Which Monitoring & Troubleshooting pattern is commonly tested on AWS Certified Database – Specialty for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate monitoring & troubleshooting least-privilege principles",
      "Rely solely on manual processes with no monitoring & troubleshooting automation",
      "Ignore monitoring & troubleshooting compliance requirements for faster deployment",
      "Use the certified monitoring & troubleshooting methodology specified for AWS Certified Database – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified monitoring & troubleshooting methodology specified for AWS Certified Database – Specialty candidates. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "A government agency is preparing for AWS Certified Database – Specialty and must strengthen Database Security. Which option is BEST?",
    opts: [
      "Adopt the database security control framework referenced in AWS Certified Database – Specialty study materials",
      "Rely solely on manual processes with no database security automation",
      "Ignore database security compliance requirements for faster deployment",
      "Mix production and test database security configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the database security control framework referenced in AWS Certified Database – Specialty study materials. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "During a AWS Certified Database – Specialty readiness review at a SaaS startup scaling rapidly, which Workload-Specific Database Design approach meets certification objectives?",
    opts: [
      "Ignore workload-specific database design compliance requirements for faster deployment",
      "Configure workload-specific database design according to AWS Certified Database – Specialty exam blueprint recommendations",
      "Mix production and test workload-specific database design configurations in one environment",
      "Store sensitive workload-specific database design credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure workload-specific database design according to AWS Certified Database – Specialty exam blueprint recommendations. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified Database – Specialty recommends improvements to Deployment & Migration. What should they implement?",
    opts: [
      "Mix production and test deployment & migration configurations in one environment",
      "Store sensitive deployment & migration credentials in plain text configuration files",
      "Select the deployment & migration option that meets AWS Certified Database – Specialty security and governance standards",
      "Skip deployment & migration testing before production rollout",
    ],
    a: 2,
    exp: "Select the deployment & migration option that meets AWS Certified Database – Specialty security and governance standards. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "Which Management & Operations strategy is MOST appropriate when a media company with global users adopts AWS Certified Database – Specialty standards?",
    opts: [
      "Store sensitive management & operations credentials in plain text configuration files",
      "Skip management & operations testing before production rollout",
      "Implement management & operations without change management or rollback plans",
      "Design management & operations using patterns validated in AWS Certified Database – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design management & operations using patterns validated in AWS Certified Database – Specialty practice assessments. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "An audit of a multinational enterprise reveals gaps in Monitoring & Troubleshooting for AWS Certified Database – Specialty. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified Database – Specialty-aligned monitoring & troubleshooting approach recommended in official exam objectives",
      "Skip monitoring & troubleshooting testing before production rollout",
      "Implement monitoring & troubleshooting without change management or rollback plans",
      "Use default monitoring & troubleshooting settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Database – Specialty-aligned monitoring & troubleshooting approach recommended in official exam objectives. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "A regulated financial institution is designing a AWS Certified Database – Specialty study plan focused on Database Security. Which resource topic is essential?",
    opts: [
      "Implement database security without change management or rollback plans",
      "Follow industry best practices for database security as defined in the AWS Certified Database – Specialty body of knowledge",
      "Use default database security settings without hardening",
      "Centralize all database security decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for database security as defined in the AWS Certified Database – Specialty body of knowledge. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "When a healthcare organization implements AWS Certified Database – Specialty controls for Workload-Specific Database Design, which practice reduces operational risk?",
    opts: [
      "Use default workload-specific database design settings without hardening",
      "Centralize all workload-specific database design decisions without stakeholder review",
      "Implement the standard workload-specific database design solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Deprecate workload-specific database design controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard workload-specific database design solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "A AWS Certified Database – Specialty practice exam scenario covers Deployment & Migration for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Centralize all deployment & migration decisions without stakeholder review",
      "Deprecate deployment & migration controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses deployment & migration policies",
      "Use the certified deployment & migration methodology specified for AWS Certified Database – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified deployment & migration methodology specified for AWS Certified Database – Specialty candidates. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "Which Management & Operations principle is emphasized in AWS Certified Database – Specialty when supporting a government agency?",
    opts: [
      "Adopt the management & operations control framework referenced in AWS Certified Database – Specialty study materials",
      "Deprecate management & operations controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses management & operations policies",
      "Disable monitoring for management & operations to improve performance",
    ],
    a: 0,
    exp: "Adopt the management & operations control framework referenced in AWS Certified Database – Specialty study materials. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified Database – Specialty question on Monitoring & Troubleshooting. What concept should they review?",
    opts: [
      "Use an undocumented workaround that bypasses monitoring & troubleshooting policies",
      "Configure monitoring & troubleshooting according to AWS Certified Database – Specialty exam blueprint recommendations",
      "Disable monitoring for monitoring & troubleshooting to improve performance",
      "Grant excessive privileges that violate monitoring & troubleshooting least-privilege principles",
    ],
    a: 1,
    exp: "Configure monitoring & troubleshooting according to AWS Certified Database – Specialty exam blueprint recommendations. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "For AWS Certified Database – Specialty certification, Database Security knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Disable monitoring for database security to improve performance",
      "Grant excessive privileges that violate database security least-privilege principles",
      "Select the database security option that meets AWS Certified Database – Specialty security and governance standards",
      "Rely solely on manual processes with no database security automation",
    ],
    a: 2,
    exp: "Select the database security option that meets AWS Certified Database – Specialty security and governance standards. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "A team at a media company with global users debates Workload-Specific Database Design options while studying AWS Certified Database – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Grant excessive privileges that violate workload-specific database design least-privilege principles",
      "Rely solely on manual processes with no workload-specific database design automation",
      "Ignore workload-specific database design compliance requirements for faster deployment",
      "Design workload-specific database design using patterns validated in AWS Certified Database – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design workload-specific database design using patterns validated in AWS Certified Database – Specialty practice assessments. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "Which Deployment & Migration capability is validated by AWS Certified Database – Specialty for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Database – Specialty-aligned deployment & migration approach recommended in official exam objectives",
      "Rely solely on manual processes with no deployment & migration automation",
      "Ignore deployment & migration compliance requirements for faster deployment",
      "Mix production and test deployment & migration configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Database – Specialty-aligned deployment & migration approach recommended in official exam objectives. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "When evaluating Management & Operations tools for AWS Certified Database – Specialty, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Ignore management & operations compliance requirements for faster deployment",
      "Follow industry best practices for management & operations as defined in the AWS Certified Database – Specialty body of knowledge",
      "Mix production and test management & operations configurations in one environment",
      "Store sensitive management & operations credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for management & operations as defined in the AWS Certified Database – Specialty body of knowledge. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "A healthcare organization must document Monitoring & Troubleshooting procedures for AWS Certified Database – Specialty compliance. Which standard applies?",
    opts: [
      "Mix production and test monitoring & troubleshooting configurations in one environment",
      "Store sensitive monitoring & troubleshooting credentials in plain text configuration files",
      "Implement the standard monitoring & troubleshooting solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Skip monitoring & troubleshooting testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard monitoring & troubleshooting solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "A AWS Certified Database – Specialty instructor asks about Database Security in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Store sensitive database security credentials in plain text configuration files",
      "Skip database security testing before production rollout",
      "Implement database security without change management or rollback plans",
      "Use the certified database security methodology specified for AWS Certified Database – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified database security methodology specified for AWS Certified Database – Specialty candidates. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "Which Workload-Specific Database Design metric best indicates AWS Certified Database – Specialty readiness for a government agency?",
    opts: [
      "Adopt the workload-specific database design control framework referenced in AWS Certified Database – Specialty study materials",
      "Skip workload-specific database design testing before production rollout",
      "Implement workload-specific database design without change management or rollback plans",
      "Use default workload-specific database design settings without hardening",
    ],
    a: 0,
    exp: "Adopt the workload-specific database design control framework referenced in AWS Certified Database – Specialty study materials. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "A SaaS startup scaling rapidly is troubleshooting a Deployment & Migration issue while preparing for AWS Certified Database – Specialty. What is the first step?",
    opts: [
      "Implement deployment & migration without change management or rollback plans",
      "Configure deployment & migration according to AWS Certified Database – Specialty exam blueprint recommendations",
      "Use default deployment & migration settings without hardening",
      "Centralize all deployment & migration decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure deployment & migration according to AWS Certified Database – Specialty exam blueprint recommendations. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "In AWS Certified Database – Specialty, how should a manufacturing company modernizing IT handle a trade-off involving Management & Operations?",
    opts: [
      "Use default management & operations settings without hardening",
      "Centralize all management & operations decisions without stakeholder review",
      "Select the management & operations option that meets AWS Certified Database – Specialty security and governance standards",
      "Deprecate management & operations controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the management & operations option that meets AWS Certified Database – Specialty security and governance standards. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "Which Monitoring & Troubleshooting pattern is commonly tested on AWS Certified Database – Specialty for scenarios involving a media company with global users?",
    opts: [
      "Centralize all monitoring & troubleshooting decisions without stakeholder review",
      "Deprecate monitoring & troubleshooting controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses monitoring & troubleshooting policies",
      "Design monitoring & troubleshooting using patterns validated in AWS Certified Database – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design monitoring & troubleshooting using patterns validated in AWS Certified Database – Specialty practice assessments. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "A multinational enterprise is preparing for AWS Certified Database – Specialty and must strengthen Database Security. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Database – Specialty-aligned database security approach recommended in official exam objectives",
      "Deprecate database security controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses database security policies",
      "Disable monitoring for database security to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Database – Specialty-aligned database security approach recommended in official exam objectives. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "A consultant advising a healthcare organization on AWS Certified Database – Specialty recommends improvements to Workload-Specific Database Design. What should they implement?",
    opts: [
      "Disable monitoring for workload-specific database design to improve performance",
      "Grant excessive privileges that violate workload-specific database design least-privilege principles",
      "Implement the standard workload-specific database design solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Rely solely on manual processes with no workload-specific database design automation",
    ],
    a: 2,
    exp: "Implement the standard workload-specific database design solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "Which Deployment & Migration strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Database – Specialty standards?",
    opts: [
      "Grant excessive privileges that violate deployment & migration least-privilege principles",
      "Rely solely on manual processes with no deployment & migration automation",
      "Ignore deployment & migration compliance requirements for faster deployment",
      "Use the certified deployment & migration methodology specified for AWS Certified Database – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified deployment & migration methodology specified for AWS Certified Database – Specialty candidates. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "An audit of a government agency reveals gaps in Management & Operations for AWS Certified Database – Specialty. Which remediation is CORRECT?",
    opts: [
      "Adopt the management & operations control framework referenced in AWS Certified Database – Specialty study materials",
      "Rely solely on manual processes with no management & operations automation",
      "Ignore management & operations compliance requirements for faster deployment",
      "Mix production and test management & operations configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the management & operations control framework referenced in AWS Certified Database – Specialty study materials. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Database – Specialty study plan focused on Monitoring & Troubleshooting. Which resource topic is essential?",
    opts: [
      "Ignore monitoring & troubleshooting compliance requirements for faster deployment",
      "Configure monitoring & troubleshooting according to AWS Certified Database – Specialty exam blueprint recommendations",
      "Mix production and test monitoring & troubleshooting configurations in one environment",
      "Store sensitive monitoring & troubleshooting credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure monitoring & troubleshooting according to AWS Certified Database – Specialty exam blueprint recommendations. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Database Security ──
  {
    domain: "Database Security",
    q: "When a manufacturing company modernizing IT implements AWS Certified Database – Specialty controls for Database Security, which practice reduces operational risk?",
    opts: [
      "Mix production and test database security configurations in one environment",
      "Store sensitive database security credentials in plain text configuration files",
      "Select the database security option that meets AWS Certified Database – Specialty security and governance standards",
      "Skip database security testing before production rollout",
    ],
    a: 2,
    exp: "Select the database security option that meets AWS Certified Database – Specialty security and governance standards. This is the recommended approach for the Database Security domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Workload-Specific Database Design ──
  {
    domain: "Workload-Specific Database Design",
    q: "A AWS Certified Database – Specialty practice exam scenario covers Workload-Specific Database Design for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive workload-specific database design credentials in plain text configuration files",
      "Skip workload-specific database design testing before production rollout",
      "Implement workload-specific database design without change management or rollback plans",
      "Design workload-specific database design using patterns validated in AWS Certified Database – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design workload-specific database design using patterns validated in AWS Certified Database – Specialty practice assessments. This is the recommended approach for the Workload-Specific Database Design domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Deployment & Migration ──
  {
    domain: "Deployment & Migration",
    q: "Which Deployment & Migration principle is emphasized in AWS Certified Database – Specialty when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Database – Specialty-aligned deployment & migration approach recommended in official exam objectives",
      "Skip deployment & migration testing before production rollout",
      "Implement deployment & migration without change management or rollback plans",
      "Use default deployment & migration settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Database – Specialty-aligned deployment & migration approach recommended in official exam objectives. This is the recommended approach for the Deployment & Migration domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Operations ──
  {
    domain: "Management & Operations",
    q: "A regulated financial institution failed a mock AWS Certified Database – Specialty question on Management & Operations. What concept should they review?",
    opts: [
      "Implement management & operations without change management or rollback plans",
      "Follow industry best practices for management & operations as defined in the AWS Certified Database – Specialty body of knowledge",
      "Use default management & operations settings without hardening",
      "Centralize all management & operations decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for management & operations as defined in the AWS Certified Database – Specialty body of knowledge. This is the recommended approach for the Management & Operations domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },

  // ── Monitoring & Troubleshooting ──
  {
    domain: "Monitoring & Troubleshooting",
    q: "For AWS Certified Database – Specialty certification, Monitoring & Troubleshooting knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Use default monitoring & troubleshooting settings without hardening",
      "Centralize all monitoring & troubleshooting decisions without stakeholder review",
      "Implement the standard monitoring & troubleshooting solution that satisfies AWS Certified Database – Specialty domain requirements",
      "Deprecate monitoring & troubleshooting controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard monitoring & troubleshooting solution that satisfies AWS Certified Database – Specialty domain requirements. This is the recommended approach for the Monitoring & Troubleshooting domain on the AWS Certified Database – Specialty exam and reflects current certification objectives.",
  },
];
