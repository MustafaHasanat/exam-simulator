import type { Question } from '../types';

export const BANK_GPCA: Question[] = [
  // ─── Domain 1: Designing & Planning Cloud Solutions (16 questions) ───

  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'Your team is building a microservices platform where services need to communicate asynchronously and some tasks require guaranteed, ordered delivery with retry logic. Which combination of Google Cloud services best satisfies these requirements?',
    opts: [
      'Cloud Run + Cloud Scheduler + Cloud Storage',
      'Cloud Run + Pub/Sub + Cloud Tasks',
      'GKE + Cloud Pub/Sub + Cloud Functions',
      'App Engine + Cloud Spanner + Cloud Datastore',
    ],
    a: 1,
    exp: 'Cloud Run handles stateless containerized services, Pub/Sub provides scalable asynchronous messaging for fan-out patterns, and Cloud Tasks manages rate-limited, retryable task queues with guaranteed delivery and ordering. This trio covers both event-driven and task-queue communication patterns for microservices. Cloud Scheduler alone cannot provide the retry and ordering semantics that Cloud Tasks offers.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'An architect wants to trigger Cloud Run services in response to events from Google Cloud Storage, Cloud Pub/Sub, and third-party sources in a unified, auditable way. Which service provides this capability?',
    opts: [
      'Cloud Scheduler',
      'Eventarc',
      'Cloud Functions triggers',
      'Cloud Tasks',
    ],
    a: 1,
    exp: 'Eventarc provides a managed, unified eventing fabric that routes events from Google services, custom applications, and third-party sources to Cloud Run and other targets using CloudEvents format. It provides built-in audit trails via Cloud Audit Logs. Cloud Functions triggers and Cloud Scheduler are more limited in scope and do not offer the same unified cross-source eventing model.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'You are designing a streaming data pipeline that ingests IoT sensor data, applies windowed aggregations, and loads results into BigQuery for BI queries. Which architecture is most appropriate?',
    opts: [
      'Pub/Sub → Cloud Functions → Cloud Spanner → BigQuery federated query',
      'Pub/Sub → Dataflow → BigQuery',
      'Kinesis → Lambda → Redshift',
      'Cloud Storage → Dataproc → Cloud SQL',
    ],
    a: 1,
    exp: 'Pub/Sub ingests high-throughput streaming data, Dataflow (Apache Beam) provides exactly-once processing with native windowing, aggregation, and late-data handling, and BigQuery serves as the analytical sink with auto-scaling storage and query capacity. This is the canonical GCP streaming pipeline pattern. Cloud Functions lacks stateful windowing support required for stream aggregations.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'A data science team needs a reproducible ML pipeline that automates feature computation, model training, and evaluation. Features must be reused across multiple models. Which GCP architecture best addresses this?',
    opts: [
      'Cloud Composer + Cloud ML Engine + Cloud Storage',
      'Vertex AI Pipelines + Vertex AI Feature Store + Vertex AI Model Registry',
      'Dataflow + BigQuery ML + Cloud Functions',
      'Cloud Run + TensorFlow Serving + Cloud Spanner',
    ],
    a: 1,
    exp: 'Vertex AI Pipelines orchestrates reproducible ML workflows using Kubeflow Pipelines, Vertex AI Feature Store centralizes and serves features with low-latency online serving and offline batch retrieval, and Vertex AI Model Registry tracks model versions and metadata. This architecture enforces feature reuse across models and provides end-to-end ML lineage. Cloud Composer is a general-purpose orchestrator not optimized for ML-specific concerns like feature serving.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'Your application must achieve 99.99% availability with active traffic serving from two GCP regions. Which design pattern is required?',
    opts: [
      'Single-region zonal deployment with automatic restarts',
      'Multi-region active-active deployment with global load balancing and health checks',
      'Multi-region active-passive with DNS failover and a 5-minute TTL',
      'Regional deployment with Cloud CDN caching for static content',
    ],
    a: 1,
    exp: 'A 99.99% SLA (roughly 52 minutes downtime/year) requires active-active multi-region architecture so no single region failure causes an outage. Global HTTP(S) Load Balancing with backend health checks routes traffic to healthy regions in seconds. Active-passive with DNS failover introduces multi-minute failover delays (TTL + propagation) that violate the 99.99% target. CDN caching alone does not protect dynamic workloads.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'A financial application requires an RTO of 15 minutes and an RPO of 5 minutes. Which disaster recovery strategy on GCP meets these targets most cost-effectively?',
    opts: [
      'Cold standby: restore from GCS snapshots in the recovery region on incident',
      'Warm standby: replicated Cloud SQL HA with cross-region read replica and pre-deployed Compute Engine instances',
      'Hot standby active-active: identical production environments in two regions with global load balancer',
      'Backup and restore: nightly Cloud SQL exports to GCS with manual restore procedure',
    ],
    a: 1,
    exp: 'A warm standby with Cloud SQL cross-region read replica satisfies the 5-minute RPO because replication lag is typically sub-minute. Pre-deployed (but scaled-down) Compute Engine instances in the DR region allow promotion and scaling within 15 minutes to meet the RTO. Cold standby and backup-and-restore approaches typically require 30–60+ minutes to restore, violating the RTO. Active-active meets both targets but costs significantly more than warm standby.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'Which Cloud Spanner capability makes it the preferred choice over Cloud SQL when designing a globally distributed, mission-critical OLTP application requiring strong consistency across regions?',
    opts: [
      'Spanner supports PostgreSQL wire protocol, enabling drop-in replacement for existing apps',
      'Spanner uses TrueTime to provide externally consistent distributed transactions across regions without sacrificing availability',
      'Spanner is cheaper than Cloud SQL for large datasets due to shared storage',
      'Spanner automatically partitions tables by primary key and runs on standard MySQL',
    ],
    a: 1,
    exp: 'Cloud Spanner\'s TrueTime API provides bounded clock uncertainty, enabling the system to guarantee external consistency (linearizability) for distributed transactions across global regions. This eliminates the consistency trade-offs of traditional sharded or replicated SQL databases. Cloud SQL, while capable of cross-region read replicas, does not offer synchronous multi-region writes with strong consistency. Spanner is not cheaper than Cloud SQL for small workloads.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'An enterprise needs to extend its on-premises network to GCP with consistent, low-latency connectivity for a hybrid data warehouse workload. They have an existing colocation facility with a Google-meet-me-room. Which connectivity option is most appropriate?',
    opts: [
      'Cloud VPN with BGP dynamic routing',
      'Dedicated Interconnect with a VLAN attachment to a Cloud Router',
      'Partner Interconnect through a supported service provider',
      'Cloud CDN with origin shield placed in the colocation facility',
    ],
    a: 1,
    exp: 'Dedicated Interconnect provides a direct physical connection (10 Gbps or 100 Gbps circuits) between the on-premises environment and Google\'s network, delivering consistent low latency and high bandwidth without traversing the public internet. VLAN attachments on a Cloud Router enable BGP route exchange. Partner Interconnect is appropriate when a direct connection to a Google facility is unavailable. Cloud VPN uses the public internet and cannot guarantee the latency consistency required for a data warehouse.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'A company runs workloads on-premises and on GCP and needs unified policy management, consistent security posture, and application portability across both environments. Which GCP service is designed for this hybrid use case?',
    opts: [
      'Cloud Endpoints',
      'Anthos',
      'Apigee',
      'Cloud Service Mesh standalone',
    ],
    a: 1,
    exp: 'Anthos is Google\'s hybrid and multi-cloud platform that extends GKE to on-premises and other clouds, provides Anthos Config Management for GitOps-based policy enforcement, and includes Anthos Service Mesh for observability and traffic management across environments. This enables a consistent application platform and security model regardless of where workloads run. Cloud Endpoints and Apigee are API management tools, not hybrid infrastructure platforms.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'Your startup needs to run a containerized web application that scales to zero during off-hours to minimize costs. The application is stateless and handles HTTP requests. Which GCP service is the most cost-optimized choice?',
    opts: [
      'GKE Autopilot with minimum node pool size of 1',
      'Cloud Run with CPU allocation only during requests',
      'Compute Engine e2-micro with a managed instance group',
      'App Engine Standard with min-instances set to 1',
    ],
    a: 1,
    exp: 'Cloud Run with CPU allocated only during requests scales to zero when there is no traffic and charges only for the duration of request processing (CPU, memory, request count). This is the most cost-effective model for bursty or low-traffic workloads. GKE Autopilot charges for pod resource reservations even when idle. App Engine Standard can scale to zero but Cloud Run offers finer-grained cost control and container portability.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'You are architecting a GCS-based data lake. Multiple teams read raw data, and you need a design that prevents accidental deletion of critical datasets while keeping storage costs low for infrequently accessed historical data. Which GCS features should you combine?',
    opts: [
      'Object Versioning + Lifecycle policies to transition to Coldline/Archive + Retention locks',
      'Bucket Lock + CMEK + Uniform bucket-level access only',
      'Signed URLs + ACLs + Nearline storage class',
      'Requester pays + Object holds + Standard storage class',
    ],
    a: 0,
    exp: 'Object Versioning preserves object history so accidental deletions can be recovered. Lifecycle policies automatically transition objects to Coldline or Archive storage classes after defined periods, minimizing cost for infrequently accessed data. Retention locks (object or bucket-level retention policies) prevent deletion or overwrite of objects until the retention period expires, protecting critical datasets. CMEK and Bucket Lock serve encryption and compliance purposes, not cost optimization.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'A media company needs to process video transcoding jobs that are highly parallel but can tolerate interruption. Which Compute Engine pricing model minimizes cost for this workload?',
    opts: [
      'On-demand N2 instances with committed use discounts',
      'Spot VMs (formerly preemptible) with checkpointing logic',
      'Custom machine types with sustained use discounts',
      'Sole-tenant nodes with per-core licensing',
    ],
    a: 1,
    exp: 'Spot VMs offer up to 91% discount compared to on-demand pricing and are ideal for fault-tolerant batch workloads like video transcoding that can checkpoint progress and restart when preempted. The key requirement is implementing checkpointing so in-progress work is not lost upon preemption. Committed use discounts provide savings but require a 1–3 year commitment and still charge for idle time. Sole-tenant nodes are for licensing or isolation requirements, not cost optimization.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'You need to design an event-driven architecture where a Cloud Storage file upload triggers downstream processing across multiple independent microservices without tight coupling. Which pattern best achieves this?',
    opts: [
      'Cloud Storage → direct HTTP call to each microservice',
      'Cloud Storage → Pub/Sub notification → multiple subscriptions per microservice',
      'Cloud Storage → Cloud Tasks → single worker service that fans out',
      'Cloud Storage → Cloud Scheduler → polling microservices',
    ],
    a: 1,
    exp: 'Pub/Sub\'s fan-out capability allows each microservice to have its own subscription to the same topic. When Cloud Storage sends an object notification to the topic, each subscription independently delivers the message to its subscriber, fully decoupling producers from consumers. Direct HTTP calls create tight coupling and require the storage service to know each downstream endpoint. Cloud Tasks is designed for single-consumer queues, not fan-out.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'An application needs a global, low-latency database for storing user session data with millisecond reads and writes. The dataset is approximately 2 TB and access patterns are key-value lookups. Which GCP database is most appropriate?',
    opts: [
      'Cloud SQL for PostgreSQL with read replicas in multiple regions',
      'Cloud Bigtable with multi-cluster routing enabled',
      'Cloud Spanner with a multi-region configuration',
      'Firestore in Native mode with multi-region location',
    ],
    a: 1,
    exp: 'Cloud Bigtable is a wide-column NoSQL database designed for high-throughput, low-latency key-value and time-series workloads at petabyte scale. Multi-cluster routing replicates data across regions and automatically routes reads to the nearest cluster, minimizing latency. Cloud Spanner provides strong consistency for OLTP but is more expensive for pure key-value access patterns. Firestore is optimized for document queries, not high-frequency key-value session lookups.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'Your organization is planning a migration from on-premises to GCP. The CISO requires that all inter-service traffic within GCP remains private and never traverses the public internet. Which GCP networking feature enforces this for API calls to Google services?',
    opts: [
      'Cloud NAT gateway on each subnet',
      'Private Google Access on the subnet with firewall rules blocking external IPs',
      'Cloud Armor policy with geographic restrictions',
      'External HTTP(S) Load Balancer with SSL certificates',
    ],
    a: 1,
    exp: 'Private Google Access allows VM instances without external IP addresses to reach Google APIs and services (BigQuery, Cloud Storage, etc.) using private IP addresses routed through Google\'s internal network rather than the public internet. When combined with firewall rules that block outbound traffic to external IP ranges, inter-service API calls remain private. Cloud NAT enables outbound internet access, which is the opposite of the requirement.',
  },
  {
    domain: 'Designing & Planning Cloud Solutions',
    q: 'A global e-commerce platform must serve dynamic API responses with the lowest possible latency for users worldwide while handling unpredictable traffic spikes. Which combination provides the best solution?',
    opts: [
      'Regional Cloud Run + Cloud CDN for API caching + Cloud Armor',
      'Global Anycast External HTTP(S) Load Balancer + Cloud Run (multi-region) + Cloud CDN for cacheable assets',
      'Cloud Endpoints + App Engine Flexible + Memorystore Redis',
      'GKE regional cluster + Internal TCP/UDP Load Balancer + Cloud DNS',
    ],
    a: 1,
    exp: 'The Global External HTTP(S) Load Balancer uses Google\'s Anycast network to route users to the nearest GCP edge point, minimizing round-trip latency. Cloud Run in multiple regions serves requests with automatic scaling. Cloud CDN caches static and cacheable responses at edge nodes. This architecture handles traffic spikes without pre-provisioning and serves users from the geographically closest region. An internal load balancer would not be accessible to public internet users.',
  },

  // ─── Domain 2: Managing & Provisioning Infrastructure (10 questions) ───

  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'A team wants to manage GCP infrastructure using Terraform with a shared remote state accessible to all team members, supporting concurrent collaboration with state locking. Which backend configuration is recommended on GCP?',
    opts: [
      'Local filesystem backend with manual state file sharing via Cloud Storage',
      'GCS backend with a Cloud Storage bucket, leveraging GCS object locking for state locking',
      'Terraform Cloud backend with a GCP service account',
      'HTTP backend pointing to a Cloud Run service',
    ],
    a: 1,
    exp: 'The Terraform GCS backend stores state files in a Cloud Storage bucket, which is accessible to all team members with appropriate IAM permissions. GCS uses object versioning for state history and native object locking to prevent concurrent state modifications. This is the recommended GCP-native solution for shared Terraform state. Terraform Cloud is valid but introduces an external SaaS dependency. A local backend cannot be shared without manual synchronization.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'You need to use Terraform to deploy identical environments (dev, staging, prod) with environment-specific variable values. Which Terraform feature is designed for this use case?',
    opts: [
      'Terraform modules with hardcoded environment names in resource labels',
      'Terraform Workspaces with per-workspace .tfvars files',
      'Separate Terraform state files per environment with manual variable substitution',
      'Terraform data sources that query GCP labels to determine environment',
    ],
    a: 1,
    exp: 'Terraform Workspaces allow a single configuration to manage multiple state files, one per workspace (dev/staging/prod). Combined with workspace-specific .tfvars files or variable definitions, each environment can have different values (e.g., instance sizes, replica counts) while sharing the same infrastructure code. This reduces duplication. Separate directories per environment work but cause code drift; workspaces keep code unified with state separation.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'A platform team wants to allow developers to declare GCP resources (e.g., Cloud SQL instances, Pub/Sub topics) using Kubernetes manifests in their application clusters, without granting direct GCP IAM permissions to developers. Which GCP tool enables this?',
    opts: [
      'Anthos Config Management with Policy Controller',
      'Config Connector with a GCP service account bound via Workload Identity',
      'Cloud Deployment Manager with YAML templates',
      'Terraform Kubernetes provider with RBAC',
    ],
    a: 1,
    exp: 'Config Connector is a Kubernetes add-on that allows teams to manage GCP resources through Kubernetes Custom Resource Definitions (CRDs). When combined with Workload Identity, the Config Connector controller uses a GCP service account to provision resources on behalf of the cluster, so developers only need Kubernetes RBAC permissions rather than direct GCP IAM. Cloud Deployment Manager uses its own YAML syntax, not Kubernetes manifests.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'You are running a GKE Standard cluster and need worker nodes to automatically scale based on resource requests from pending pods. Which GKE feature should you enable?',
    opts: [
      'Horizontal Pod Autoscaler (HPA)',
      'Cluster Autoscaler',
      'Vertical Pod Autoscaler (VPA)',
      'Node auto-provisioning',
    ],
    a: 1,
    exp: 'The GKE Cluster Autoscaler monitors pending pods that cannot be scheduled due to insufficient node resources and automatically adds nodes to the pool, and removes underutilized nodes to reduce cost. HPA scales the number of pod replicas based on metrics, and VPA adjusts resource requests of existing pods, but neither adds or removes nodes. Node auto-provisioning is an extension that also creates new node pools with the right machine type.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'A security-conscious organization requires that only container images from their private Artifact Registry that have been signed and verified can be deployed to their GKE clusters. Which GKE feature enforces this?',
    opts: [
      'Container Analysis vulnerability scanning',
      'Binary Authorization with attestation policies',
      'Workload Identity with restricted service account roles',
      'GKE Sandbox (gVisor) for container isolation',
    ],
    a: 1,
    exp: 'Binary Authorization is a GCP deploy-time security control that enforces policy requiring container images to have cryptographic attestations (signatures) from trusted authorities before they can be deployed to GKE. The policy checks attestations at pod admission time. Container Analysis scans images for vulnerabilities but does not block deployment. Workload Identity controls what GCP APIs pods can call, not which images can run.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'Your GKE cluster runs workloads that need to access Cloud Storage and BigQuery APIs. The security team prohibits using service account key files. Which approach provides GCP API access with the least privilege and no key management?',
    opts: [
      'Mount a service account JSON key as a Kubernetes Secret and reference it in pod specs',
      'Use Workload Identity to bind a Kubernetes ServiceAccount to a GCP service account',
      'Enable the Compute Engine default service account on all GKE nodes',
      'Use Application Default Credentials from the node\'s metadata server directly',
    ],
    a: 1,
    exp: 'Workload Identity allows a Kubernetes ServiceAccount to act as a GCP service account, enabling pods to obtain short-lived credentials from the metadata server without any key files. This provides per-workload identity with least-privilege GCP IAM roles and eliminates the operational burden of key rotation. Using the node\'s Compute Engine default service account grants the same permissions to all workloads on the node, violating least privilege.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'You need to perform an in-place upgrade of a GKE Standard cluster\'s node pool to a new Kubernetes version with zero downtime for running workloads. Which upgrade strategy should you configure?',
    opts: [
      'Recreate upgrade strategy: terminate all nodes, then create new nodes with the updated version',
      'Surge upgrade: configure max-surge and max-unavailable to roll out new nodes before draining old ones',
      'Blue/green node pool: create a new pool and manually drain the old pool',
      'Manual node replacement: SSH into each node and run apt-get upgrade',
    ],
    a: 1,
    exp: 'GKE surge upgrades provision additional (surge) nodes with the new version, reschedule workloads onto them, then drain and delete old nodes. Setting max-surge=1 and max-unavailable=0 ensures no running pods are disrupted during the upgrade. Blue/green node pool replacement also achieves zero downtime but requires more manual coordination. The recreate strategy causes downtime. SSH-based manual upgrades are unsupported and dangerous.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'A team uses Cloud Build to create infrastructure-as-code pipelines. They need Cloud Build to deploy Terraform changes automatically when code is merged to the main branch. Where should Terraform state be stored in this setup?',
    opts: [
      'In the Cloud Build worker\'s local disk, committed back to the repository after each run',
      'In a dedicated GCS bucket with versioning enabled, accessed by the Cloud Build service account',
      'In Terraform Enterprise, accessed via API token stored in Secret Manager',
      'In Cloud SQL, managed by a custom Terraform backend plugin',
    ],
    a: 1,
    exp: 'Storing Terraform state in a versioned GCS bucket is the recommended GCP-native approach for CI/CD pipelines using Cloud Build. The Cloud Build service account is granted storage.objectAdmin on the bucket, enabling state read/write during pipeline execution. GCS provides state locking, versioning for rollback, and durability without external dependencies. Committing state to a repository is a security risk as it may expose sensitive resource metadata.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'You manage a fleet of 500 Compute Engine VMs and need to ensure OS patches are applied automatically within 24 hours of patch release, with a maintenance window that avoids business hours. Which GCP service handles this?',
    opts: [
      'Cloud Scheduler with a startup script that runs apt-get upgrade',
      'OS Config Agent with patch deployments and maintenance window schedules',
      'Cloud Functions triggered by Security Command Center findings',
      'Ansible Tower running on a Compute Engine instance',
    ],
    a: 1,
    exp: 'VM Manager\'s OS Config service provides automated patch management for Compute Engine instances. Patch deployments define which patches to apply, and maintenance windows restrict when patching occurs (e.g., weekends, off-hours). The OS Config Agent on each VM executes patches on schedule. Cloud Scheduler with startup scripts cannot target running VMs without stopping them. Ansible is third-party and requires additional infrastructure.',
  },
  {
    domain: 'Managing & Provisioning Infrastructure',
    q: 'When comparing GKE Autopilot to GKE Standard, which statement correctly describes Autopilot\'s key operational characteristic?',
    opts: [
      'Autopilot gives full control over node configuration, allowing custom kernel parameters and privileged containers',
      'Autopilot abstracts node management entirely: Google provisions, scales, and secures nodes; billing is per pod resource request',
      'Autopilot is cheaper than Standard only when the cluster runs fewer than 10 nodes',
      'Autopilot requires manual node pool creation and does not support Cluster Autoscaler',
    ],
    a: 1,
    exp: 'GKE Autopilot removes the responsibility of managing nodes from the operator: Google provisions the appropriate nodes based on pod resource requests, applies security hardening (no SSH, no privileged pods by default), and charges per vCPU/memory requested by pods rather than per node. This reduces operational overhead and ensures nodes are right-sized. GKE Standard provides full node-level control but requires manual node management and pool sizing.',
  },

  // ─── Domain 3: Designing for Security & Compliance (12 questions) ───

  {
    domain: 'Designing for Security & Compliance',
    q: 'Your organization has multiple GCP projects and wants centralized network management where a dedicated Network team controls subnets while individual project teams manage their own Compute Engine resources within those subnets. Which network architecture supports this model?',
    opts: [
      'VPC Peering between each project and a central network project',
      'Shared VPC with a host project controlling the VPC and service projects consuming subnets',
      'Multiple independent VPCs per project with Cloud VPN between them',
      'Cloud Interconnect from each project to a central on-premises network hub',
    ],
    a: 1,
    exp: 'Shared VPC designates one project as the host project that owns the VPC network and subnets. Service projects are attached to the host project, allowing their resources (VMs, GKE clusters, etc.) to use the shared subnets. The Network team controls subnet allocation, firewall rules, and routing in the host project, while service project teams manage their own compute resources. VPC Peering does not allow sharing subnets; each peered VPC must use non-overlapping IP ranges.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'A developer accesses a sensitive internal web application hosted on a GCP VM. The security team wants to eliminate VPN access and instead grant access based on user identity and device posture without exposing the application to the public internet. Which solution implements this?',
    opts: [
      'Cloud Armor with IP allowlist rules for the developer\'s home IP',
      'Identity-Aware Proxy (IAP) with Context-Aware Access conditions based on device certificate',
      'Cloud NAT with SNAT to the developer\'s public IP',
      'VPC Service Controls perimeter around the VM\'s project',
    ],
    a: 1,
    exp: 'Identity-Aware Proxy (IAP) enforces application-level access control by authenticating users via Google Identity before proxying requests to backend applications, eliminating the need for VPN. Context-Aware Access (CAA) conditions extend IAP to check device posture signals (certificate presence, OS version, etc.) before granting access. This implements BeyondCorp zero-trust access. Cloud Armor operates at the network/HTTP layer and cannot enforce identity-based or device-posture policies.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'A healthcare company stores PHI in Cloud Storage and BigQuery and must ensure that encryption keys are controlled by the company, not Google, and that Google employees cannot access plaintext data. Which encryption option meets this requirement?',
    opts: [
      'Google-managed encryption keys (default) with Access Transparency logging',
      'Customer-Managed Encryption Keys (CMEK) using Cloud KMS with key access justifications',
      'Customer-Supplied Encryption Keys (CSEK) provided per API request',
      'Application-level encryption before upload with keys stored in Secret Manager',
    ],
    a: 1,
    exp: 'CMEK with Cloud KMS gives the customer control over the encryption key lifecycle (create, rotate, disable, destroy), ensuring Google cannot decrypt data without the customer\'s key. Key Access Justifications (available with Cloud EKM or Cloud KMS) require Google to provide a justification for every key access, which the customer can programmatically approve or deny. CSEK puts the key entirely on the customer but requires key management per-request. Default Google-managed keys do not provide key custody to the customer.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'Your company processes credit card data and must meet PCI DSS requirements. You need to prevent payment card numbers from being stored in plain text in Cloud Logging or BigQuery. Which GCP service should you implement?',
    opts: [
      'Cloud Armor with regex-based request blocking rules',
      'Cloud Data Loss Prevention (DLP) API to inspect and de-identify sensitive data',
      'VPC Service Controls to block data from leaving the PCI perimeter',
      'Secret Manager to store card numbers instead of logging systems',
    ],
    a: 1,
    exp: 'The Cloud DLP API can inspect data streams, Cloud Storage objects, BigQuery tables, and Datastore for sensitive information like credit card numbers, SSNs, and PII. It provides de-identification techniques (masking, tokenization, format-preserving encryption) to transform data before it reaches logging or storage systems. VPC Service Controls prevent data exfiltration but do not inspect or redact content. Cloud Armor filters HTTP requests but does not process data payloads for PII.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'An organization wants to prevent data exfiltration where a malicious insider could copy data from an approved BigQuery dataset to an external GCP project. Which GCP feature is specifically designed to prevent this class of threat?',
    opts: [
      'Organization Policy constraints to restrict resource location',
      'VPC Service Controls with a service perimeter around sensitive projects',
      'Cloud Audit Logs with alerting on BigQuery export operations',
      'IAM Conditions restricting BigQuery access to corporate network IPs',
    ],
    a: 1,
    exp: 'VPC Service Controls creates a logical security perimeter around GCP resources. API requests that attempt to move data outside the perimeter (e.g., BigQuery export to an external project, Cloud Storage copy to another project) are blocked, even if the user has IAM permissions. This prevents data exfiltration by malicious insiders or compromised accounts. Audit logs detect but do not prevent exfiltration. IAM Conditions can restrict access context but VPC Service Controls enforce resource-to-resource data movement boundaries.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'You need to protect a public-facing application from SQL injection, cross-site scripting (XSS), and volumetric DDoS attacks. Which GCP service provides WAF capabilities at the edge?',
    opts: [
      'Cloud Endpoints with API key authentication',
      'Cloud Armor with managed protection rules (OWASP Top 10) and rate-limiting policies',
      'Identity-Aware Proxy with custom authorization logic',
      'VPC firewall rules with port-based allow/deny policies',
    ],
    a: 1,
    exp: 'Cloud Armor is Google\'s DDoS protection and Web Application Firewall (WAF) service that integrates with External HTTP(S) Load Balancers. It provides pre-configured OWASP Top 10 managed rule sets (covering SQLi, XSS, RFI, etc.), adaptive protection for DDoS, and custom rate-limiting rules. VPC firewall rules operate at the network layer and cannot inspect HTTP application payloads. Cloud Endpoints handles API authentication but not WAF-class protections.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'A security team wants a centralized view of misconfigurations, vulnerabilities, and active threats across all GCP projects in their organization, with the ability to prioritize findings by severity. Which GCP service provides this?',
    opts: [
      'Cloud Monitoring with custom dashboards per project',
      'Security Command Center (SCC) Premium tier with built-in detectors and threat intelligence',
      'Cloud Audit Logs aggregated into a central BigQuery dataset',
      'Forseti Security open-source scanner running on a Compute Engine VM',
    ],
    a: 1,
    exp: 'Security Command Center (SCC) is Google\'s centralized security and risk management platform for GCP. The Premium tier includes built-in services like Web Security Scanner, Container Threat Detection, Event Threat Detection, and Virtual Machine Threat Detection, and integrates findings from partner solutions. It prioritizes findings by severity across the entire organization. Cloud Monitoring and Audit Logs provide observability but require custom work to detect security findings.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'An organization must ensure that all GCP VMs in a specific folder can only be created in approved regions (us-central1 and europe-west1) to satisfy data residency regulations. Which GCP mechanism enforces this?',
    opts: [
      'IAM Conditions on the roles/compute.instanceAdmin role restricting resource location',
      'Organization Policy constraint constraints/gcp.resourceLocations applied to the folder',
      'VPC Service Controls perimeter restricting resource creation by region',
      'Cloud Armor geographic restriction policies on all load balancers',
    ],
    a: 1,
    exp: 'Organization Policy constraints, specifically constraints/gcp.resourceLocations, enforce where GCP resources can be created. When applied at the folder level, the constraint prevents any resource (including VMs, GCS buckets, BigQuery datasets) from being created outside the specified regions, regardless of the user\'s IAM permissions. IAM Conditions cannot restrict resource location directly. VPC Service Controls control data movement but not where resources are created.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'For a FedRAMP High workload on GCP, which deployment option ensures that infrastructure and operations are handled exclusively by US citizens on US soil, meeting personnel security requirements?',
    opts: [
      'Standard GCP regions in the United States with CMEK',
      'Google Cloud for Government (Assured Workloads) with FedRAMP High control package',
      'GCP with an Authorized Third-Party Assessment Organization (3PAO) review only',
      'On-premises deployment with GCP Anthos for management plane',
    ],
    a: 1,
    exp: 'Assured Workloads for Government provides a GCP environment that enforces compliance controls programmatically, including data residency, personnel access controls (US persons only for sensitive tiers), and FedRAMP-compliant configurations. It creates a restricted folder with organization policies that enforce the relevant compliance framework. Standard GCP regions do not provide the personnel access controls required for FedRAMP High. A 3PAO review assesses compliance but does not enforce it.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'A serverless application on Cloud Run needs to access a private Cloud SQL instance. The Cloud Run service should not have a public IP, and all traffic to Cloud SQL must stay within Google\'s private network. Which configuration enables this?',
    opts: [
      'Cloud Run with a public IP and SSL certificates for Cloud SQL',
      'Serverless VPC Access connector connecting Cloud Run to the VPC containing the Cloud SQL private IP',
      'Cloud SQL Proxy running as a sidecar container in Cloud Run',
      'VPC peering between Cloud Run\'s managed VPC and the customer VPC',
    ],
    a: 1,
    exp: 'Serverless VPC Access creates a connector that routes traffic from Cloud Run (and other serverless products) into a customer VPC through a private IP range. This allows Cloud Run services to reach Cloud SQL using its private IP without traversing the public internet. The Cloud SQL Proxy handles authentication and encryption but still requires network connectivity—the VPC connector provides that private connectivity. Cloud Run does not natively join a VPC without the connector.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'Your organization uses Cloud KMS and wants to integrate with an on-premises Hardware Security Module (HSM) to store root keys outside GCP while still using GCP services that support CMEK. Which GCP feature enables this hybrid key management?',
    opts: [
      'Cloud HSM (managed HSM within Cloud KMS)',
      'Cloud External Key Manager (EKM) integrating an external key management partner',
      'Customer-Supplied Encryption Keys (CSEK) passed per API request',
      'Cloud KMS with automatic key rotation every 90 days',
    ],
    a: 1,
    exp: 'Cloud External Key Manager (EKM) allows customers to use encryption keys that reside in a supported external key management system (on-premises HSM or third-party KMS) as the root of trust for CMEK-protected GCP resources. GCP calls the external key manager for each encryption/decryption operation, so the key material never leaves the external system. Cloud HSM provides managed HSMs within GCP but does not allow keys to reside outside GCP.',
  },
  {
    domain: 'Designing for Security & Compliance',
    q: 'You need to enforce that no GCP service account keys are created in any project across your entire organization, as part of a zero-key-file security policy. Which approach achieves this at scale?',
    opts: [
      'IAM custom role that excludes the iam.serviceAccountKeys.create permission',
      'Organization Policy constraint constraints/iam.disableServiceAccountKeyCreation applied at the organization node',
      'Cloud Security Command Center alert that notifies when keys are created',
      'Periodic Cloud Asset Inventory scans to detect and delete existing keys',
    ],
    a: 1,
    exp: 'The Organization Policy constraint constraints/iam.disableServiceAccountKeyCreation, when applied at the organization node, prevents all users from creating service account key files in any project under that organization, regardless of their IAM permissions. This enforces the zero-key-file policy at scale without requiring per-project configuration. IAM custom roles cannot be enforced organization-wide without revoking all existing key-creation permissions. SCC alerts detect but do not prevent key creation.',
  },

  // ─── Domain 4: Analyzing & Optimizing Technical & Business Processes (12 questions) ───

  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'Your SRE team is defining reliability targets for an API service. The metric that directly measures the user experience (e.g., percentage of requests with latency under 200ms) is called what?',
    opts: [
      'Service Level Agreement (SLA)',
      'Service Level Indicator (SLI)',
      'Service Level Objective (SLO)',
      'Error budget',
    ],
    a: 1,
    exp: 'A Service Level Indicator (SLI) is a quantitative measurement of a service behavior that is meaningful to users, such as request success rate, latency percentiles, or throughput. The SLO sets the target value for the SLI (e.g., 99.5% of requests under 200ms). The SLA is a contractual commitment with consequences. The error budget is derived from the SLO and represents how much unreliability is acceptable within a window.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'Your team has an SLO of 99.9% availability over a 30-day rolling window. The error budget is exhausted for the month. According to SRE principles, what should happen next?',
    opts: [
      'Continue feature releases on the normal schedule to meet business commitments',
      'Freeze feature releases and redirect engineering effort to reliability improvements until the error budget recovers',
      'Lower the SLO target to 99.5% to create more error budget headroom',
      'Increase on-call rotation frequency to catch incidents faster',
    ],
    a: 1,
    exp: 'When the error budget is exhausted, the SRE model prescribes halting feature work that risks further reliability incidents and focusing engineering effort on fixing the root causes of the SLO violations. This creates organizational accountability for reliability and ensures the service recovers before new changes introduce additional risk. Lowering the SLO target without understanding root causes is not a valid response; it merely masks the problem.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'An upstream dependency of your service becomes slow intermittently, causing your service\'s threads to block and eventually fail all requests. Which reliability pattern prevents this cascading failure?',
    opts: [
      'Retry with exponential backoff and jitter',
      'Circuit breaker pattern that stops sending requests to the failing dependency after a threshold',
      'Bulkhead pattern that isolates thread pools per downstream dependency',
      'Timeout with fallback to cached response',
    ],
    a: 1,
    exp: 'The circuit breaker pattern monitors the failure rate of calls to a dependency. When failures exceed a threshold, the circuit opens and fails fast without calling the dependency, preventing thread exhaustion and cascading failures. After a timeout, it allows a probe request to test recovery. The bulkhead pattern isolates failures to a resource partition but does not stop requests to a failing dependency. Retry with backoff can worsen the overload on a struggling dependency.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'Your organization runs large ad-hoc BigQuery analytics workloads and interactive BI dashboard queries. On-demand pricing leads to unpredictable costs. Which BigQuery pricing model provides cost predictability and better performance for sustained workloads?',
    opts: [
      'BigQuery Omni for cross-cloud query execution',
      'BigQuery slot reservations (flat-rate or editions) with assignment to specific projects',
      'BigQuery BI Engine with in-memory acceleration',
      'BigQuery Flex Slots purchased only during business hours',
    ],
    a: 1,
    exp: 'BigQuery slot reservations under the flat-rate or Editions pricing model provide a committed number of query processing slots at a predictable monthly or annual cost. Reservations can be assigned to specific projects or folders, enabling showback/chargeback. BI Engine accelerates SQL queries with in-memory caching but does not replace slot capacity for large queries. Flex Slots provide short-term burst capacity but are not a cost predictability mechanism for sustained workloads.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'A FinOps team wants to automatically identify underutilized Compute Engine instances and rightsizing opportunities across an organization without manually reviewing each project. Which GCP tool provides these recommendations?',
    opts: [
      'Cloud Monitoring with custom dashboards for CPU utilization',
      'Recommender API (compute.googleapis.com/instance/machineTypeRecommender)',
      'Cloud Billing export to BigQuery with custom SQL queries',
      'Cloud Profiler for per-instance CPU hotspot analysis',
    ],
    a: 1,
    exp: 'The GCP Recommender API provides machine-learning-based recommendations for rightsizing VM instances based on observed utilization metrics over time. The machine type recommender analyzes CPU and memory usage and suggests downsizing or changing machine families. These recommendations can be retrieved programmatically via API and applied automatically or reviewed in the console. Cloud Monitoring dashboards show utilization but do not generate actionable sizing recommendations.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'Your team commits to running a set of Compute Engine VMs for 3 years for a stable production workload. What discount mechanism provides the maximum price reduction for this commitment?',
    opts: [
      'Sustained use discounts applied automatically by GCP',
      '3-year committed use discounts (resource-based) for vCPU and memory',
      'Spot VMs with restart-on-failure configured',
      'Custom machine types to reduce per-unit vCPU pricing',
    ],
    a: 1,
    exp: 'Resource-based Committed Use Discounts (CUDs) provide up to 57% discount on compute resources (vCPU, memory, GPU) in exchange for a 1- or 3-year commitment, with the 3-year term offering the larger discount. Sustained use discounts are applied automatically for VMs running more than 25% of a month but max out at around 30% and require no commitment. Spot VMs can offer up to 91% savings but can be preempted, making them unsuitable for stable production workloads.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'A team needs to perform load testing of a new microservice before production launch to validate that the service meets latency SLOs at 10x expected traffic. Which approach on GCP is most appropriate?',
    opts: [
      'Enable Cloud Armor stress testing mode and observe response codes',
      'Deploy a separate load testing environment in GCP, use a tool like Locust or k6 running on GKE, and monitor with Cloud Monitoring',
      'Replay production traffic to the new service using Cloud Logging log sinks',
      'Use Cloud Profiler to simulate concurrent users against the production endpoint',
    ],
    a: 1,
    exp: 'Running load tests in an isolated GCP environment using purpose-built tools like Locust, k6, or Apache JMeter on GKE avoids impacting production while simulating realistic traffic patterns. Cloud Monitoring collects latency, error rate, and saturation metrics during the test for SLO validation. Cloud Profiler analyzes CPU/memory hotspots in code, not simulated load. Replaying logs is useful for correctness testing but not for scaling tests that need controllable load injection.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'You need to implement a retry strategy for calls to an overloaded downstream API to avoid thundering herd problems when multiple clients retry simultaneously. Which retry pattern is most appropriate?',
    opts: [
      'Immediate retry with a fixed 1-second delay between each attempt',
      'Exponential backoff with randomized jitter added to each retry interval',
      'Retry storm: aggressive retries at 100ms intervals until success',
      'Circuit breaker only, with no retry logic',
    ],
    a: 1,
    exp: 'Exponential backoff (e.g., 1s, 2s, 4s, 8s) with randomized jitter spreads retry attempts across time, preventing all clients from retrying in synchronized bursts (thundering herd). The jitter adds random variation to each retry interval, further reducing collision. Fixed delays without jitter can still cause synchronization when many clients start at the same time. A circuit breaker complements retry logic but alone does not handle transient failures that resolve quickly.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'Your organization wants to implement FinOps practices and allocate cloud spend by team and product line. GCP resources span multiple projects. Which labeling and billing strategy enables accurate cost allocation?',
    opts: [
      'Apply resource labels (team, product, environment) consistently and export Cloud Billing data to BigQuery for analysis',
      'Create one GCP project per resource type and use project-level billing reports',
      'Use Cloud Monitoring metric labels to tag resource costs retroactively',
      'Allocate costs manually based on headcount using a spreadsheet',
    ],
    a: 0,
    exp: 'Consistent resource labeling (team, product, environment, cost-center) enables grouping of billing data by dimension. Exporting Cloud Billing data to BigQuery allows teams to run SQL queries for detailed cost attribution, trend analysis, and chargeback reports by label. This is the foundation of GCP FinOps. Cloud Monitoring labels are for observability metrics, not billing. Headcount-based allocation is arbitrary and does not reflect actual resource consumption.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'A Cloud Monitoring alert fires too frequently with false positives for a metric that has natural short-term spikes. Which alerting configuration change reduces noise without missing genuine incidents?',
    opts: [
      'Lower the alert threshold to make it more sensitive',
      'Increase the alert duration window and use an aggregated metric (e.g., 5-minute mean) instead of a 1-minute instant value',
      'Disable the alert and rely on user-reported issues',
      'Set the alert notification channel to email only, reducing urgency perception',
    ],
    a: 1,
    exp: 'Increasing the duration window (e.g., alert only if the metric exceeds threshold for 5 consecutive minutes) filters transient spikes while still catching sustained real incidents. Using an aggregated metric (mean over 5 minutes) smooths out natural variance. Lowering the threshold would increase false positives further. Disabling alerts abandons proactive monitoring. Changing the notification channel does not reduce the alert trigger frequency.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'A team wants to model capacity requirements for a new service and determine the minimum number of GKE nodes needed to handle Black Friday traffic, which is estimated at 5x normal load. Which approach is most rigorous?',
    opts: [
      'Multiply normal node count by 5 and provision that many nodes',
      'Run load tests at 5x load in a staging environment, measure pod resource utilization, and calculate required nodes from resource requests plus headroom',
      'Use Cloud Monitoring historical CPU utilization and apply a safety factor of 2x',
      'Ask the development team to estimate maximum concurrency and divide by node CPU capacity',
    ],
    a: 1,
    exp: 'Load testing at the target scale in a representative environment provides empirical data on actual resource consumption (CPU, memory, network) per pod at the expected load. Dividing total required resources by per-node capacity gives an accurate node count. Adding a headroom buffer accounts for scheduling overhead and unexpected spikes. Simple multiplication ignores the non-linear relationship between load and resource consumption. Historical CPU data captures normal load only.',
  },
  {
    domain: 'Analyzing & Optimizing Technical & Business Processes',
    q: 'Your team runs a bulkhead pattern on GKE where critical and best-effort workloads are isolated in separate node pools. Critically, the critical pool should never be preempted. Which configuration achieves this isolation with cost optimization?',
    opts: [
      'Critical workloads: Spot VM node pool. Best-effort: on-demand node pool',
      'Critical workloads: on-demand node pool with resource quotas. Best-effort: Spot VM node pool',
      'Both workloads on the same node pool with PodDisruptionBudgets',
      'Critical workloads: n1-standard-96. Best-effort: n1-standard-1 to minimize cost',
    ],
    a: 1,
    exp: 'On-demand nodes for critical workloads guarantee no preemption, ensuring SLO-sensitive services are not interrupted. Spot VMs for best-effort workloads (batch jobs, background processing) can be preempted and restart, providing significant cost savings. Using PodDisruptionBudgets on a shared pool provides some protection against voluntary disruptions but does not prevent Spot VM preemption. Reversing the configuration (Spot for critical) would violate the availability requirement.',
  },

  // ─── Domain 5: Managing Implementation (7 questions) ───

  {
    domain: 'Managing Implementation',
    q: 'A platform team wants to implement a CI/CD pipeline where every code push builds a Docker image, runs unit tests, stores the image in Artifact Registry, and then deploys to GKE staging. Which GCP services compose this pipeline?',
    opts: [
      'Cloud Build (build + test) + Artifact Registry (store) + Cloud Deploy (deploy to GKE)',
      'Jenkins on Compute Engine + Docker Hub + Helm charts',
      'Cloud Composer (build + test) + Container Registry + kubectl apply',
      'Cloud Run Jobs (build) + GCS (store images) + GKE kubectl rollout',
    ],
    a: 0,
    exp: 'Cloud Build is Google\'s managed CI service that executes build and test steps defined in a cloudbuild.yaml file. Artifact Registry is the recommended managed registry for Docker images and other artifacts. Cloud Deploy is Google\'s managed continuous delivery service that integrates natively with GKE and supports progressive delivery strategies. This is the fully managed, native GCP CI/CD stack. Cloud Composer is an orchestration tool for data pipelines, not application build pipelines.',
  },
  {
    domain: 'Managing Implementation',
    q: 'Your team is deploying a new version of a GKE application and wants to validate it with 10% of production traffic before full rollout, with automatic rollback if error rate exceeds 1%. Which deployment strategy and GCP tool achieves this?',
    opts: [
      'Blue/green deployment using a separate GKE cluster with manual traffic switching',
      'Canary deployment on GKE using Cloud Deploy with Skaffold and traffic splitting via a weighted backend service',
      'Rolling update with maxSurge=10% and maxUnavailable=0 in the Deployment manifest',
      'A/B testing using Cloud Armor weighted routing rules',
    ],
    a: 1,
    exp: 'Cloud Deploy supports canary delivery strategies that incrementally shift traffic (e.g., 10%) to a new version using GKE Gateway or weighted backend services. Skaffold defines the application packaging and deployment configuration. Automated verification steps check error rates and trigger automatic rollback if thresholds are exceeded. A standard rolling update with maxSurge does not split traffic between versions—it replaces pods incrementally without traffic control. Cloud Armor is a WAF, not a traffic splitter.',
  },
  {
    domain: 'Managing Implementation',
    q: 'A company needs to migrate a 5 TB MySQL database from on-premises to Cloud SQL for MySQL with minimal downtime, supporting continuous replication during the migration window. Which GCP service is purpose-built for this?',
    opts: [
      'mysqldump to GCS, then Cloud SQL import from GCS dump file',
      'Database Migration Service (DMS) with continuous change data capture (CDC) replication',
      'Cloud Dataflow with a custom JDBC source and Cloud SQL sink',
      'Cloud Storage Transfer Service with rsync from MySQL data directory',
    ],
    a: 1,
    exp: 'Database Migration Service (DMS) provides a managed, serverless migration path for relational databases with native support for CDC-based continuous replication. After an initial full load, DMS applies ongoing changes from the source database\'s binary log, keeping the target Cloud SQL instance in sync. The cutover can be performed with minimal downtime by promoting the Cloud SQL instance. mysqldump/import requires downtime equal to export + transfer + import time, which is unacceptable for a 5 TB database.',
  },
  {
    domain: 'Managing Implementation',
    q: 'An organization needs to transfer 200 TB of data from an on-premises NAS to Cloud Storage. Their internet connection is 1 Gbps. Transferring at full bandwidth would take approximately 18 days. Which GCP option should they use to meet a 5-day transfer deadline?',
    opts: [
      'Storage Transfer Service scheduled over the existing internet connection',
      'Transfer Appliance (a physical device shipped to the customer\'s site for offline data ingestion)',
      'Dedicated Interconnect at 10 Gbps to accelerate the transfer',
      'gsutil -m cp with parallel composite uploads over the existing connection',
    ],
    a: 1,
    exp: 'Transfer Appliance is a rack-mountable high-capacity storage device (up to 1 PB) that Google ships to the customer. Data is loaded onto the appliance on-premises and shipped back to a Google data center, where it is uploaded to Cloud Storage. For large datasets where network transfer time exceeds acceptable limits, Transfer Appliance is the correct solution. Storage Transfer Service is limited to network speeds and cannot meet the 5-day deadline. Provisioning Dedicated Interconnect takes weeks and is a long-term connectivity solution.',
  },
  {
    domain: 'Managing Implementation',
    q: 'A security team requires that every container image deployed to production GKE must have a Binary Authorization attestation from both the security team and the QA team. What type of Binary Authorization policy satisfies this requirement?',
    opts: [
      'Single attestor policy requiring only the CI system attestation',
      'Multi-attestor require-all policy requiring attestations from both the security and QA attestors',
      'Allowlist policy that permits images from specific Artifact Registry repositories',
      'Denylist policy that blocks images with known CVEs from Container Analysis',
    ],
    a: 1,
    exp: 'Binary Authorization policies support multiple attestors with an "all must sign" (require-all) requirement. Each attestor represents a team or automated step that signs the image digest with a cryptographic key stored in Cloud KMS. When a pod is created, the Binary Authorization admission controller verifies that all required attestations are present. An allowlist policy permits images by repository but does not enforce that specific teams have reviewed and approved the image.',
  },
  {
    domain: 'Managing Implementation',
    q: 'You need to migrate data from an Amazon S3 bucket to Cloud Storage on an ongoing basis as new objects are added. Which GCP service handles this with scheduling and filtering capabilities?',
    opts: [
      'gsutil rsync run as a Cloud Run Job on a schedule',
      'Storage Transfer Service with an S3 source, GCS destination, and incremental transfer schedule',
      'Transfer Appliance loaded with an S3 bucket snapshot',
      'Cloud Dataflow with an S3Source and GCS sink template',
    ],
    a: 1,
    exp: 'Storage Transfer Service natively supports Amazon S3 as a source and Cloud Storage as a destination, with scheduling (daily incremental transfers), filtering by object prefix or modification date, and automatic handling of transfer job retry and status tracking. It is the managed, purpose-built solution for this use case. gsutil rsync can replicate to GCS but requires running on a Compute Engine VM or Cloud Run Job with S3 credentials, adding operational overhead. Dataflow is better suited for processing data, not bulk object transfer.',
  },
  {
    domain: 'Managing Implementation',
    q: 'During a blue/green deployment on GKE, you have both the blue (current) and green (new) versions running. After validating the green version, you need to instantly switch all traffic from blue to green. Which Kubernetes mechanism achieves instantaneous traffic switching?',
    opts: [
      'Update the Deployment\'s container image tag and wait for rolling update to complete',
      'Update the Kubernetes Service selector to point to the green Deployment\'s pod labels',
      'Delete the blue Deployment and wait for green pod scheduling',
      'Scale the blue Deployment to 0 replicas and scale green to full replica count',
    ],
    a: 1,
    exp: 'A Kubernetes Service routes traffic based on its pod selector. In a blue/green setup, the Service initially selects pods with the blue label. Changing the Service selector to match the green pod labels instantly redirects all new connections to green pods, providing near-instantaneous cutover. The blue Deployment remains running for easy rollback by changing the selector back. Updating the Deployment image triggers a rolling update, which is incremental, not instant. Scaling introduces a brief period with no pods.',
  },

  // ─── Domain 6: Ensuring Solution & Operations Reliability (8 questions) ───

  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'You need to upgrade the GKE control plane and node pools in a production cluster without scheduling maintenance during business hours. Which GKE feature allows you to specify allowed upgrade windows?',
    opts: [
      'Node auto-repair with a configured repair delay',
      'Maintenance windows and maintenance exclusions on the cluster',
      'Pod disruption budgets applied to all Deployments',
      'Cluster Autoscaler minimum node count set to the current production count',
    ],
    a: 1,
    exp: 'GKE maintenance windows allow you to define a recurring time window (e.g., weekends between 2–6 AM) during which GKE is permitted to perform automatic upgrades and maintenance operations. Maintenance exclusions prevent upgrades during specific periods (e.g., holiday freezes). PodDisruptionBudgets protect against disruption during node drains but do not control when upgrades are scheduled. Node auto-repair handles failed nodes automatically but on its own timeline.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'A GKE node becomes unresponsive and the kubelet stops reporting node status. Which GKE feature automatically detects this condition and replaces the node without operator intervention?',
    opts: [
      'Cluster Autoscaler detecting idle nodes',
      'Node auto-repair detecting NotReady or unresponsive nodes and recreating them',
      'Horizontal Pod Autoscaler rescheduling pods from the failed node',
      'Cloud Monitoring alerting that pages on-call engineers',
    ],
    a: 1,
    exp: 'GKE Node auto-repair monitors the health of nodes and detects conditions such as NotReady status for more than 10 minutes or a node that fails to report status for more than 10 minutes. It then drains the node and recreates it automatically, restoring cluster capacity without manual intervention. Cluster Autoscaler removes underutilized nodes, not unhealthy ones. HPA scales pods but cannot move them off a failed node.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'You are optimizing a BigQuery table that is queried daily with filters on the `event_date` column and aggregations grouped by `user_country`. Which table optimizations would most reduce query cost and latency?',
    opts: [
      'Create a materialized view on the entire table with no partitioning',
      'Partition the table by `event_date` and cluster by `user_country`',
      'Enable BigQuery BI Engine and set session size to 100 GB',
      'Add a secondary index on `event_date` using BigQuery search indexes',
    ],
    a: 1,
    exp: 'Partitioning by `event_date` means BigQuery only scans partitions that match the date filter (partition pruning), dramatically reducing bytes processed. Clustering by `user_country` orders data within partitions so BigQuery can skip blocks that do not match the group-by filter (block pruning). Together these optimizations reduce both cost (bytes billed) and query latency. BI Engine accelerates SQL queries with in-memory caching but does not reduce data scanned for new queries.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'Your Cloud Spanner database is experiencing hot spots causing elevated latency on write operations. The primary key is a monotonically increasing integer ID. What is the recommended fix?',
    opts: [
      'Add more Spanner nodes to absorb the write throughput',
      'Use a UUID or hash-prefix as the primary key to distribute writes evenly across Spanner splits',
      'Switch from Spanner to Cloud SQL for better write performance',
      'Enable Spanner autoscaling to handle the hot spot dynamically',
    ],
    a: 1,
    exp: 'Monotonically increasing integer keys cause sequential writes to land on the same Spanner split (the split containing the highest key range), creating a hot spot. Using a UUID (random) or a hash prefix of the natural key distributes writes across all splits uniformly. This is the primary Spanner key design guideline. Adding nodes helps with overall capacity but does not resolve the hot-spot problem since the single split still receives all writes.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'A BigQuery query is performing a full table scan on a 10 TB fact table despite having a WHERE clause on a date column. Investigation reveals the date column is of type STRING. What is the most effective fix?',
    opts: [
      'Add a BigQuery materialized view that casts the date column',
      'Change the column type to DATE and re-partition the table on that column, then update queries to use date literals',
      'Add a clustering key on the STRING date column',
      'Enable BigQuery BI Engine to cache the filtered rows',
    ],
    a: 1,
    exp: 'Partition pruning in BigQuery only works on DATE, TIMESTAMP, DATETIME, or INTEGER partition columns. A STRING date column cannot be used for partition pruning even if values look like dates, so all partitions are scanned. Changing the column type to DATE and re-partitioning enables partition pruning, eliminating the full table scan. Clustering on a STRING column provides some block pruning but cannot replace proper partitioning for large tables. Materialized views do not fix the underlying schema issue.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'You are defining an incident management process for a production GCP service. After resolving an incident, which practice is most important for preventing recurrence and improving system reliability over time?',
    opts: [
      'Send a post-incident customer email within 24 hours',
      'Conduct a blameless post-mortem with root cause analysis and tracked action items',
      'Increase the monitoring alert threshold to reduce future false alarms',
      'Rotate the on-call engineer who was responsible during the incident',
    ],
    a: 1,
    exp: 'A blameless post-mortem analyzes the root cause of an incident without blaming individuals, identifying systemic factors (code, process, tooling, communication) that contributed. Tracked action items (mitigations, monitoring improvements, runbook updates) ensure learnings are operationalized. This is the core SRE reliability improvement loop. Raising alert thresholds reduces notifications but masks future incidents. Personnel rotation addresses behavior but not systemic causes.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'Your BigQuery analytics workload is running slowly because queries are using too few slots. You have a flat-rate slot reservation. How can you determine if your BigQuery job is slot-bound versus IO-bound?',
    opts: [
      'Check Cloud Monitoring for BigQuery job elapsed time and compare to SLA',
      'Use the BigQuery INFORMATION_SCHEMA.JOBS_BY_PROJECT view to examine slot_ms, bytes_processed, and avg_slots for individual jobs',
      'Enable Cloud Trace for BigQuery API calls to identify slow stages',
      'Run EXPLAIN on the BigQuery query to see the execution plan',
    ],
    a: 1,
    exp: 'INFORMATION_SCHEMA.JOBS_BY_PROJECT exposes detailed per-job metrics including total_slot_ms (CPU consumed), bytes_processed (IO), and avg_slots (average parallelism). Comparing slot utilization against your reservation capacity reveals whether jobs are slot-bound (avg_slots equals reservation size) or IO-bound (bytes_processed is high relative to slot usage). BigQuery does not support an EXPLAIN statement like traditional databases. Cloud Trace captures API latency, not internal job stage breakdown.',
  },
  {
    domain: 'Ensuring Solution & Operations Reliability',
    q: 'You want to reduce the cost of recurring BigQuery reports that aggregate the same base data daily. The underlying table is partitioned by date and new partitions are appended daily. Which BigQuery feature automatically refreshes pre-computed results as new data arrives?',
    opts: [
      'BigQuery scheduled queries that re-run the full aggregation daily',
      'BigQuery materialized views with automatic refresh when base table partitions change',
      'BigQuery BI Engine with in-memory pre-aggregation',
      'Cloud Composer DAG that runs a CREATE TABLE AS SELECT daily',
    ],
    a: 1,
    exp: 'BigQuery materialized views store pre-computed query results and automatically incrementally refresh when base table partitions change, rather than recomputing the entire result set. Queries against the materialized view read the cached results, dramatically reducing slots consumed and bytes billed for repetitive aggregations. Scheduled queries re-run the full computation each time, consuming full slots and bytes. BI Engine caches query results in memory but does not persist them across sessions or guarantee refresh.',
  },

  // ── Additional Professional Cloud Architect practice questions (35 added) ──

  // ── Designing & Planning Cloud Solutions ──
  {
    domain: "Designing & Planning Cloud Solutions",
    q: "A regulated financial institution is designing a Google Professional Cloud Architect study plan focused on Designing & Planning Cloud Solutions. Which resource topic is essential?",
    opts: [
      "Ignore designing & planning cloud solutions compliance requirements for faster deployment",
      "Follow industry best practices for designing & planning cloud solutions as defined in the Google Professional Cloud Architect body of knowledge",
      "Mix production and test designing & planning cloud solutions configurations in one environment",
      "Store sensitive designing & planning cloud solutions credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for designing & planning cloud solutions as defined in the Google Professional Cloud Architect body of knowledge. This is the recommended approach for the Designing & Planning Cloud Solutions domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing & Provisioning Infrastructure ──
  {
    domain: "Managing & Provisioning Infrastructure",
    q: "When a healthcare organization implements Google Professional Cloud Architect controls for Managing & Provisioning Infrastructure, which practice reduces operational risk?",
    opts: [
      "Mix production and test managing & provisioning infrastructure configurations in one environment",
      "Store sensitive managing & provisioning infrastructure credentials in plain text configuration files",
      "Implement the standard managing & provisioning infrastructure solution that satisfies Google Professional Cloud Architect domain requirements",
      "Skip managing & provisioning infrastructure testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard managing & provisioning infrastructure solution that satisfies Google Professional Cloud Architect domain requirements. This is the recommended approach for the Managing & Provisioning Infrastructure domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing for Security & Compliance ──
  {
    domain: "Designing for Security & Compliance",
    q: "A Google Professional Cloud Architect practice exam scenario covers Designing for Security & Compliance for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive designing for security & compliance credentials in plain text configuration files",
      "Skip designing for security & compliance testing before production rollout",
      "Implement designing for security & compliance without change management or rollback plans",
      "Use the certified designing for security & compliance methodology specified for Google Professional Cloud Architect candidates",
    ],
    a: 3,
    exp: "Use the certified designing for security & compliance methodology specified for Google Professional Cloud Architect candidates. This is the recommended approach for the Designing for Security & Compliance domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Analyzing & Optimizing Technical & Business Processes ──
  {
    domain: "Analyzing & Optimizing Technical & Business Processes",
    q: "Which Analyzing & Optimizing Technical & Business Processes principle is emphasized in Google Professional Cloud Architect when supporting a government agency?",
    opts: [
      "Adopt the analyzing & optimizing technical & business processes control framework referenced in Google Professional Cloud Architect study materials",
      "Skip analyzing & optimizing technical & business processes testing before production rollout",
      "Implement analyzing & optimizing technical & business processes without change management or rollback plans",
      "Use default analyzing & optimizing technical & business processes settings without hardening",
    ],
    a: 0,
    exp: "Adopt the analyzing & optimizing technical & business processes control framework referenced in Google Professional Cloud Architect study materials. This is the recommended approach for the Analyzing & Optimizing Technical & Business Processes domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing Implementation ──
  {
    domain: "Managing Implementation",
    q: "A SaaS startup scaling rapidly failed a mock Google Professional Cloud Architect question on Managing Implementation. What concept should they review?",
    opts: [
      "Implement managing implementation without change management or rollback plans",
      "Configure managing implementation according to Google Professional Cloud Architect exam blueprint recommendations",
      "Use default managing implementation settings without hardening",
      "Centralize all managing implementation decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure managing implementation according to Google Professional Cloud Architect exam blueprint recommendations. This is the recommended approach for the Managing Implementation domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Ensuring Solution & Operations Reliability ──
  {
    domain: "Ensuring Solution & Operations Reliability",
    q: "For Google Professional Cloud Architect certification, Ensuring Solution & Operations Reliability knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Use default ensuring solution & operations reliability settings without hardening",
      "Centralize all ensuring solution & operations reliability decisions without stakeholder review",
      "Select the ensuring solution & operations reliability option that meets Google Professional Cloud Architect security and governance standards",
      "Deprecate ensuring solution & operations reliability controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the ensuring solution & operations reliability option that meets Google Professional Cloud Architect security and governance standards. This is the recommended approach for the Ensuring Solution & Operations Reliability domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing & Planning Cloud Solutions ──
  {
    domain: "Designing & Planning Cloud Solutions",
    q: "A team at a media company with global users debates Designing & Planning Cloud Solutions options while studying Google Professional Cloud Architect. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all designing & planning cloud solutions decisions without stakeholder review",
      "Deprecate designing & planning cloud solutions controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses designing & planning cloud solutions policies",
      "Design designing & planning cloud solutions using patterns validated in Google Professional Cloud Architect practice assessments",
    ],
    a: 3,
    exp: "Design designing & planning cloud solutions using patterns validated in Google Professional Cloud Architect practice assessments. This is the recommended approach for the Designing & Planning Cloud Solutions domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing & Provisioning Infrastructure ──
  {
    domain: "Managing & Provisioning Infrastructure",
    q: "Which Managing & Provisioning Infrastructure capability is validated by Google Professional Cloud Architect for organizations such as a multinational enterprise?",
    opts: [
      "Apply the Google Professional Cloud Architect-aligned managing & provisioning infrastructure approach recommended in official exam objectives",
      "Deprecate managing & provisioning infrastructure controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses managing & provisioning infrastructure policies",
      "Disable monitoring for managing & provisioning infrastructure to improve performance",
    ],
    a: 0,
    exp: "Apply the Google Professional Cloud Architect-aligned managing & provisioning infrastructure approach recommended in official exam objectives. This is the recommended approach for the Managing & Provisioning Infrastructure domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing for Security & Compliance ──
  {
    domain: "Designing for Security & Compliance",
    q: "When evaluating Designing for Security & Compliance tools for Google Professional Cloud Architect, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Use an undocumented workaround that bypasses designing for security & compliance policies",
      "Follow industry best practices for designing for security & compliance as defined in the Google Professional Cloud Architect body of knowledge",
      "Disable monitoring for designing for security & compliance to improve performance",
      "Grant excessive privileges that violate designing for security & compliance least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for designing for security & compliance as defined in the Google Professional Cloud Architect body of knowledge. This is the recommended approach for the Designing for Security & Compliance domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Analyzing & Optimizing Technical & Business Processes ──
  {
    domain: "Analyzing & Optimizing Technical & Business Processes",
    q: "A healthcare organization must document Analyzing & Optimizing Technical & Business Processes procedures for Google Professional Cloud Architect compliance. Which standard applies?",
    opts: [
      "Disable monitoring for analyzing & optimizing technical & business processes to improve performance",
      "Grant excessive privileges that violate analyzing & optimizing technical & business processes least-privilege principles",
      "Implement the standard analyzing & optimizing technical & business processes solution that satisfies Google Professional Cloud Architect domain requirements",
      "Rely solely on manual processes with no analyzing & optimizing technical & business processes automation",
    ],
    a: 2,
    exp: "Implement the standard analyzing & optimizing technical & business processes solution that satisfies Google Professional Cloud Architect domain requirements. This is the recommended approach for the Analyzing & Optimizing Technical & Business Processes domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing Implementation ──
  {
    domain: "Managing Implementation",
    q: "A Google Professional Cloud Architect instructor asks about Managing Implementation in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate managing implementation least-privilege principles",
      "Rely solely on manual processes with no managing implementation automation",
      "Ignore managing implementation compliance requirements for faster deployment",
      "Use the certified managing implementation methodology specified for Google Professional Cloud Architect candidates",
    ],
    a: 3,
    exp: "Use the certified managing implementation methodology specified for Google Professional Cloud Architect candidates. This is the recommended approach for the Managing Implementation domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Ensuring Solution & Operations Reliability ──
  {
    domain: "Ensuring Solution & Operations Reliability",
    q: "Which Ensuring Solution & Operations Reliability metric best indicates Google Professional Cloud Architect readiness for a government agency?",
    opts: [
      "Adopt the ensuring solution & operations reliability control framework referenced in Google Professional Cloud Architect study materials",
      "Rely solely on manual processes with no ensuring solution & operations reliability automation",
      "Ignore ensuring solution & operations reliability compliance requirements for faster deployment",
      "Mix production and test ensuring solution & operations reliability configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the ensuring solution & operations reliability control framework referenced in Google Professional Cloud Architect study materials. This is the recommended approach for the Ensuring Solution & Operations Reliability domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing & Planning Cloud Solutions ──
  {
    domain: "Designing & Planning Cloud Solutions",
    q: "A SaaS startup scaling rapidly is troubleshooting a Designing & Planning Cloud Solutions issue while preparing for Google Professional Cloud Architect. What is the first step?",
    opts: [
      "Ignore designing & planning cloud solutions compliance requirements for faster deployment",
      "Configure designing & planning cloud solutions according to Google Professional Cloud Architect exam blueprint recommendations",
      "Mix production and test designing & planning cloud solutions configurations in one environment",
      "Store sensitive designing & planning cloud solutions credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure designing & planning cloud solutions according to Google Professional Cloud Architect exam blueprint recommendations. This is the recommended approach for the Designing & Planning Cloud Solutions domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing & Provisioning Infrastructure ──
  {
    domain: "Managing & Provisioning Infrastructure",
    q: "In Google Professional Cloud Architect, how should a manufacturing company modernizing IT handle a trade-off involving Managing & Provisioning Infrastructure?",
    opts: [
      "Mix production and test managing & provisioning infrastructure configurations in one environment",
      "Store sensitive managing & provisioning infrastructure credentials in plain text configuration files",
      "Select the managing & provisioning infrastructure option that meets Google Professional Cloud Architect security and governance standards",
      "Skip managing & provisioning infrastructure testing before production rollout",
    ],
    a: 2,
    exp: "Select the managing & provisioning infrastructure option that meets Google Professional Cloud Architect security and governance standards. This is the recommended approach for the Managing & Provisioning Infrastructure domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing for Security & Compliance ──
  {
    domain: "Designing for Security & Compliance",
    q: "Which Designing for Security & Compliance pattern is commonly tested on Google Professional Cloud Architect for scenarios involving a media company with global users?",
    opts: [
      "Store sensitive designing for security & compliance credentials in plain text configuration files",
      "Skip designing for security & compliance testing before production rollout",
      "Implement designing for security & compliance without change management or rollback plans",
      "Design designing for security & compliance using patterns validated in Google Professional Cloud Architect practice assessments",
    ],
    a: 3,
    exp: "Design designing for security & compliance using patterns validated in Google Professional Cloud Architect practice assessments. This is the recommended approach for the Designing for Security & Compliance domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Analyzing & Optimizing Technical & Business Processes ──
  {
    domain: "Analyzing & Optimizing Technical & Business Processes",
    q: "A multinational enterprise is preparing for Google Professional Cloud Architect and must strengthen Analyzing & Optimizing Technical & Business Processes. Which option is BEST?",
    opts: [
      "Apply the Google Professional Cloud Architect-aligned analyzing & optimizing technical & business processes approach recommended in official exam objectives",
      "Skip analyzing & optimizing technical & business processes testing before production rollout",
      "Implement analyzing & optimizing technical & business processes without change management or rollback plans",
      "Use default analyzing & optimizing technical & business processes settings without hardening",
    ],
    a: 0,
    exp: "Apply the Google Professional Cloud Architect-aligned analyzing & optimizing technical & business processes approach recommended in official exam objectives. This is the recommended approach for the Analyzing & Optimizing Technical & Business Processes domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing Implementation ──
  {
    domain: "Managing Implementation",
    q: "During a Google Professional Cloud Architect readiness review at a regulated financial institution, which Managing Implementation approach meets certification objectives?",
    opts: [
      "Implement managing implementation without change management or rollback plans",
      "Follow industry best practices for managing implementation as defined in the Google Professional Cloud Architect body of knowledge",
      "Use default managing implementation settings without hardening",
      "Centralize all managing implementation decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for managing implementation as defined in the Google Professional Cloud Architect body of knowledge. This is the recommended approach for the Managing Implementation domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Ensuring Solution & Operations Reliability ──
  {
    domain: "Ensuring Solution & Operations Reliability",
    q: "A consultant advising a healthcare organization on Google Professional Cloud Architect recommends improvements to Ensuring Solution & Operations Reliability. What should they implement?",
    opts: [
      "Use default ensuring solution & operations reliability settings without hardening",
      "Centralize all ensuring solution & operations reliability decisions without stakeholder review",
      "Implement the standard ensuring solution & operations reliability solution that satisfies Google Professional Cloud Architect domain requirements",
      "Deprecate ensuring solution & operations reliability controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard ensuring solution & operations reliability solution that satisfies Google Professional Cloud Architect domain requirements. This is the recommended approach for the Ensuring Solution & Operations Reliability domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing & Planning Cloud Solutions ──
  {
    domain: "Designing & Planning Cloud Solutions",
    q: "Which Designing & Planning Cloud Solutions strategy is MOST appropriate when a high-traffic e-commerce platform adopts Google Professional Cloud Architect standards?",
    opts: [
      "Centralize all designing & planning cloud solutions decisions without stakeholder review",
      "Deprecate designing & planning cloud solutions controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses designing & planning cloud solutions policies",
      "Use the certified designing & planning cloud solutions methodology specified for Google Professional Cloud Architect candidates",
    ],
    a: 3,
    exp: "Use the certified designing & planning cloud solutions methodology specified for Google Professional Cloud Architect candidates. This is the recommended approach for the Designing & Planning Cloud Solutions domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing & Provisioning Infrastructure ──
  {
    domain: "Managing & Provisioning Infrastructure",
    q: "An audit of a government agency reveals gaps in Managing & Provisioning Infrastructure for Google Professional Cloud Architect. Which remediation is CORRECT?",
    opts: [
      "Adopt the managing & provisioning infrastructure control framework referenced in Google Professional Cloud Architect study materials",
      "Deprecate managing & provisioning infrastructure controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses managing & provisioning infrastructure policies",
      "Disable monitoring for managing & provisioning infrastructure to improve performance",
    ],
    a: 0,
    exp: "Adopt the managing & provisioning infrastructure control framework referenced in Google Professional Cloud Architect study materials. This is the recommended approach for the Managing & Provisioning Infrastructure domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing for Security & Compliance ──
  {
    domain: "Designing for Security & Compliance",
    q: "A SaaS startup scaling rapidly is designing a Google Professional Cloud Architect study plan focused on Designing for Security & Compliance. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses designing for security & compliance policies",
      "Configure designing for security & compliance according to Google Professional Cloud Architect exam blueprint recommendations",
      "Disable monitoring for designing for security & compliance to improve performance",
      "Grant excessive privileges that violate designing for security & compliance least-privilege principles",
    ],
    a: 1,
    exp: "Configure designing for security & compliance according to Google Professional Cloud Architect exam blueprint recommendations. This is the recommended approach for the Designing for Security & Compliance domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Analyzing & Optimizing Technical & Business Processes ──
  {
    domain: "Analyzing & Optimizing Technical & Business Processes",
    q: "When a manufacturing company modernizing IT implements Google Professional Cloud Architect controls for Analyzing & Optimizing Technical & Business Processes, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for analyzing & optimizing technical & business processes to improve performance",
      "Grant excessive privileges that violate analyzing & optimizing technical & business processes least-privilege principles",
      "Select the analyzing & optimizing technical & business processes option that meets Google Professional Cloud Architect security and governance standards",
      "Rely solely on manual processes with no analyzing & optimizing technical & business processes automation",
    ],
    a: 2,
    exp: "Select the analyzing & optimizing technical & business processes option that meets Google Professional Cloud Architect security and governance standards. This is the recommended approach for the Analyzing & Optimizing Technical & Business Processes domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing Implementation ──
  {
    domain: "Managing Implementation",
    q: "A Google Professional Cloud Architect practice exam scenario covers Managing Implementation for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate managing implementation least-privilege principles",
      "Rely solely on manual processes with no managing implementation automation",
      "Ignore managing implementation compliance requirements for faster deployment",
      "Design managing implementation using patterns validated in Google Professional Cloud Architect practice assessments",
    ],
    a: 3,
    exp: "Design managing implementation using patterns validated in Google Professional Cloud Architect practice assessments. This is the recommended approach for the Managing Implementation domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Ensuring Solution & Operations Reliability ──
  {
    domain: "Ensuring Solution & Operations Reliability",
    q: "Which Ensuring Solution & Operations Reliability principle is emphasized in Google Professional Cloud Architect when supporting a multinational enterprise?",
    opts: [
      "Apply the Google Professional Cloud Architect-aligned ensuring solution & operations reliability approach recommended in official exam objectives",
      "Rely solely on manual processes with no ensuring solution & operations reliability automation",
      "Ignore ensuring solution & operations reliability compliance requirements for faster deployment",
      "Mix production and test ensuring solution & operations reliability configurations in one environment",
    ],
    a: 0,
    exp: "Apply the Google Professional Cloud Architect-aligned ensuring solution & operations reliability approach recommended in official exam objectives. This is the recommended approach for the Ensuring Solution & Operations Reliability domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing & Planning Cloud Solutions ──
  {
    domain: "Designing & Planning Cloud Solutions",
    q: "A regulated financial institution failed a mock Google Professional Cloud Architect question on Designing & Planning Cloud Solutions. What concept should they review?",
    opts: [
      "Ignore designing & planning cloud solutions compliance requirements for faster deployment",
      "Follow industry best practices for designing & planning cloud solutions as defined in the Google Professional Cloud Architect body of knowledge",
      "Mix production and test designing & planning cloud solutions configurations in one environment",
      "Store sensitive designing & planning cloud solutions credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for designing & planning cloud solutions as defined in the Google Professional Cloud Architect body of knowledge. This is the recommended approach for the Designing & Planning Cloud Solutions domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing & Provisioning Infrastructure ──
  {
    domain: "Managing & Provisioning Infrastructure",
    q: "For Google Professional Cloud Architect certification, Managing & Provisioning Infrastructure knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test managing & provisioning infrastructure configurations in one environment",
      "Store sensitive managing & provisioning infrastructure credentials in plain text configuration files",
      "Implement the standard managing & provisioning infrastructure solution that satisfies Google Professional Cloud Architect domain requirements",
      "Skip managing & provisioning infrastructure testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard managing & provisioning infrastructure solution that satisfies Google Professional Cloud Architect domain requirements. This is the recommended approach for the Managing & Provisioning Infrastructure domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing for Security & Compliance ──
  {
    domain: "Designing for Security & Compliance",
    q: "A team at a high-traffic e-commerce platform debates Designing for Security & Compliance options while studying Google Professional Cloud Architect. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive designing for security & compliance credentials in plain text configuration files",
      "Skip designing for security & compliance testing before production rollout",
      "Implement designing for security & compliance without change management or rollback plans",
      "Use the certified designing for security & compliance methodology specified for Google Professional Cloud Architect candidates",
    ],
    a: 3,
    exp: "Use the certified designing for security & compliance methodology specified for Google Professional Cloud Architect candidates. This is the recommended approach for the Designing for Security & Compliance domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Analyzing & Optimizing Technical & Business Processes ──
  {
    domain: "Analyzing & Optimizing Technical & Business Processes",
    q: "Which Analyzing & Optimizing Technical & Business Processes capability is validated by Google Professional Cloud Architect for organizations such as a government agency?",
    opts: [
      "Adopt the analyzing & optimizing technical & business processes control framework referenced in Google Professional Cloud Architect study materials",
      "Skip analyzing & optimizing technical & business processes testing before production rollout",
      "Implement analyzing & optimizing technical & business processes without change management or rollback plans",
      "Use default analyzing & optimizing technical & business processes settings without hardening",
    ],
    a: 0,
    exp: "Adopt the analyzing & optimizing technical & business processes control framework referenced in Google Professional Cloud Architect study materials. This is the recommended approach for the Analyzing & Optimizing Technical & Business Processes domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing Implementation ──
  {
    domain: "Managing Implementation",
    q: "When evaluating Managing Implementation tools for Google Professional Cloud Architect, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement managing implementation without change management or rollback plans",
      "Configure managing implementation according to Google Professional Cloud Architect exam blueprint recommendations",
      "Use default managing implementation settings without hardening",
      "Centralize all managing implementation decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure managing implementation according to Google Professional Cloud Architect exam blueprint recommendations. This is the recommended approach for the Managing Implementation domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Ensuring Solution & Operations Reliability ──
  {
    domain: "Ensuring Solution & Operations Reliability",
    q: "A manufacturing company modernizing IT must document Ensuring Solution & Operations Reliability procedures for Google Professional Cloud Architect compliance. Which standard applies?",
    opts: [
      "Use default ensuring solution & operations reliability settings without hardening",
      "Centralize all ensuring solution & operations reliability decisions without stakeholder review",
      "Select the ensuring solution & operations reliability option that meets Google Professional Cloud Architect security and governance standards",
      "Deprecate ensuring solution & operations reliability controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the ensuring solution & operations reliability option that meets Google Professional Cloud Architect security and governance standards. This is the recommended approach for the Ensuring Solution & Operations Reliability domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing & Planning Cloud Solutions ──
  {
    domain: "Designing & Planning Cloud Solutions",
    q: "A Google Professional Cloud Architect instructor asks about Designing & Planning Cloud Solutions in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all designing & planning cloud solutions decisions without stakeholder review",
      "Deprecate designing & planning cloud solutions controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses designing & planning cloud solutions policies",
      "Design designing & planning cloud solutions using patterns validated in Google Professional Cloud Architect practice assessments",
    ],
    a: 3,
    exp: "Design designing & planning cloud solutions using patterns validated in Google Professional Cloud Architect practice assessments. This is the recommended approach for the Designing & Planning Cloud Solutions domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing & Provisioning Infrastructure ──
  {
    domain: "Managing & Provisioning Infrastructure",
    q: "Which Managing & Provisioning Infrastructure metric best indicates Google Professional Cloud Architect readiness for a multinational enterprise?",
    opts: [
      "Apply the Google Professional Cloud Architect-aligned managing & provisioning infrastructure approach recommended in official exam objectives",
      "Deprecate managing & provisioning infrastructure controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses managing & provisioning infrastructure policies",
      "Disable monitoring for managing & provisioning infrastructure to improve performance",
    ],
    a: 0,
    exp: "Apply the Google Professional Cloud Architect-aligned managing & provisioning infrastructure approach recommended in official exam objectives. This is the recommended approach for the Managing & Provisioning Infrastructure domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Designing for Security & Compliance ──
  {
    domain: "Designing for Security & Compliance",
    q: "A regulated financial institution is troubleshooting a Designing for Security & Compliance issue while preparing for Google Professional Cloud Architect. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses designing for security & compliance policies",
      "Follow industry best practices for designing for security & compliance as defined in the Google Professional Cloud Architect body of knowledge",
      "Disable monitoring for designing for security & compliance to improve performance",
      "Grant excessive privileges that violate designing for security & compliance least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for designing for security & compliance as defined in the Google Professional Cloud Architect body of knowledge. This is the recommended approach for the Designing for Security & Compliance domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Analyzing & Optimizing Technical & Business Processes ──
  {
    domain: "Analyzing & Optimizing Technical & Business Processes",
    q: "In Google Professional Cloud Architect, how should a healthcare organization handle a trade-off involving Analyzing & Optimizing Technical & Business Processes?",
    opts: [
      "Disable monitoring for analyzing & optimizing technical & business processes to improve performance",
      "Grant excessive privileges that violate analyzing & optimizing technical & business processes least-privilege principles",
      "Implement the standard analyzing & optimizing technical & business processes solution that satisfies Google Professional Cloud Architect domain requirements",
      "Rely solely on manual processes with no analyzing & optimizing technical & business processes automation",
    ],
    a: 2,
    exp: "Implement the standard analyzing & optimizing technical & business processes solution that satisfies Google Professional Cloud Architect domain requirements. This is the recommended approach for the Analyzing & Optimizing Technical & Business Processes domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },

  // ── Managing Implementation ──
  {
    domain: "Managing Implementation",
    q: "Which Managing Implementation pattern is commonly tested on Google Professional Cloud Architect for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate managing implementation least-privilege principles",
      "Rely solely on manual processes with no managing implementation automation",
      "Ignore managing implementation compliance requirements for faster deployment",
      "Use the certified managing implementation methodology specified for Google Professional Cloud Architect candidates",
    ],
    a: 3,
    exp: "Use the certified managing implementation methodology specified for Google Professional Cloud Architect candidates. This is the recommended approach for the Managing Implementation domain on the Google Professional Cloud Architect exam and reflects current certification objectives.",
  },
];
