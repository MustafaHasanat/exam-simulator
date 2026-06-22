import type { Question } from '../types';

export const BANK_GACE: Question[] = [
  // ─── Domain 1: Setting up a Cloud Solution Environment (11 questions) ───

  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'Your company wants to track GCP spending by department. What is the recommended way to associate billing data with individual departments?',
    opts: [
      'Create one project per department and link each to its own billing account',
      'Use billing labels on resources and export billing data to BigQuery',
      'Create folders per department and use a single billing account',
      'Use Cloud Monitoring dashboards to break down cost by resource',
    ],
    a: 1,
    exp: 'Billing labels allow you to tag resources with key-value pairs (e.g., department=finance) and then export billing data to BigQuery for analysis. This provides granular cost attribution without requiring separate billing accounts per department.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'An organization needs to export all GCP billing data to BigQuery for long-term cost analysis. Which configuration step is required?',
    opts: [
      'Enable the BigQuery Data Transfer Service and schedule a daily export job',
      'Configure a billing export in the Billing console and specify a BigQuery dataset',
      'Create a Cloud Scheduler job that calls the Cloud Billing API and writes to BigQuery',
      'Use Data Studio to connect directly to the Billing API without any export setup',
    ],
    a: 1,
    exp: 'Billing export to BigQuery is configured directly in the Cloud Billing console under "Billing export." You select the project and dataset where detailed or summary billing data should be streamed continuously.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'A developer needs read-only access to Cloud Storage buckets across an entire GCP organization. Following least-privilege principles, which role should be granted at the organization level?',
    opts: [
      'roles/storage.admin',
      'roles/storage.objectViewer',
      'roles/viewer',
      'roles/storage.legacyBucketReader',
    ],
    a: 1,
    exp: 'roles/storage.objectViewer grants read access to objects within buckets without granting bucket-level administrative permissions. Granting it at the organization level means it is inherited by all projects, applying least privilege for read-only object access.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'You need to allow a CI/CD pipeline running outside GCP to authenticate with Google Cloud APIs without storing a service account key. What is the recommended approach?',
    opts: [
      'Download a JSON service account key and store it as a CI/CD secret variable',
      'Use Workload Identity Federation to map the external identity to a GCP service account',
      'Create a user account for the pipeline and generate an OAuth token',
      'Use API keys restricted to the specific APIs the pipeline needs',
    ],
    a: 1,
    exp: 'Workload Identity Federation lets external workloads (GitHub Actions, AWS, Azure, etc.) exchange their native tokens for short-lived Google credentials, eliminating the need to store long-lived service account keys. This is Google\'s recommended keyless authentication approach.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'Which gcloud command correctly lists all Compute Engine instances in a specific project and zone?',
    opts: [
      'gcloud compute instances list --project=my-project --zone=us-central1-a',
      'gcloud compute list instances --project=my-project --region=us-central1',
      'gcloud instances list --project=my-project --zone=us-central1-a',
      'gsutil ls gs://my-project/instances --zone=us-central1-a',
    ],
    a: 0,
    exp: 'The correct syntax is "gcloud compute instances list" with optional --project and --zone flags to scope the output. gsutil is for Cloud Storage, not Compute Engine, and the other options use incorrect command structures.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'A new GCP project has been created but calls to the Compute Engine API are failing with a "service not enabled" error. What must you do?',
    opts: [
      'Grant the project owner the roles/compute.admin role',
      'Enable the Compute Engine API for the project via the API Library or gcloud services enable',
      'Create a VPC network before the API becomes available',
      'Link the project to a billing account to auto-enable all APIs',
    ],
    a: 1,
    exp: 'GCP APIs must be explicitly enabled per project before they can be used. You enable them via "gcloud services enable compute.googleapis.com" or through the API Library page in the console. Billing linkage alone does not enable APIs.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'Your organization wants to enforce that all projects must reside under a specific folder. Which GCP construct enforces this resource hierarchy?',
    opts: [
      'Organization Policy with resource location constraints',
      'VPC Service Controls perimeter',
      'A shared VPC with a host project',
      'Billing account budget alerts',
    ],
    a: 0,
    exp: 'Organization Policies allow administrators to set constraints across the resource hierarchy, including requiring resources to be created only in specific folders or under specific organizational nodes. VPC Service Controls manage API-level perimeters, not project placement.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'A team needs to grant a service account the ability to create and delete Cloud Storage buckets without giving it any other permissions. Which predefined role fulfills this with least privilege?',
    opts: [
      'roles/storage.admin',
      'roles/storage.objectAdmin',
      'roles/editor',
      'roles/storage.legacyBucketOwner',
    ],
    a: 0,
    exp: 'roles/storage.admin includes permissions to create and delete buckets (storage.buckets.create, storage.buckets.delete) and is the predefined role that covers bucket-level management. roles/storage.objectAdmin only manages objects within existing buckets.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'Which IAM role allows a user to manage billing accounts but NOT to view resource costs or export billing data?',
    opts: [
      'roles/billing.viewer',
      'roles/billing.admin',
      'roles/billing.projectManager',
      'roles/billing.costsManager',
    ],
    a: 2,
    exp: 'roles/billing.projectManager allows users to link and unlink projects to billing accounts but does not grant access to view billing data or costs. roles/billing.admin has full control including cost visibility, and roles/billing.viewer can see costs.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'You want to use Cloud Shell to run gcloud commands without installing the Cloud SDK locally. Which statement about Cloud Shell is true?',
    opts: [
      'Cloud Shell requires you to install gcloud components before use',
      'Cloud Shell provides a pre-configured environment with gcloud, gsutil, bq, and kubectl already installed',
      'Cloud Shell sessions persist indefinitely with no storage limits',
      'Cloud Shell can only be accessed via the gcloud CLI, not the browser console',
    ],
    a: 1,
    exp: 'Cloud Shell is a browser-accessible shell environment that comes pre-installed with the Cloud SDK (gcloud, gsutil, bq), kubectl, and other tools. It provides 5 GB of persistent home directory storage but sessions are ephemeral beyond that.',
  },
  {
    domain: 'Setting up a Cloud Solution Environment',
    q: 'An administrator wants to create a custom IAM role with only the permissions to list and get Compute Engine instances. What is the correct approach?',
    opts: [
      'Clone the roles/compute.viewer role and remove unwanted permissions via the console or gcloud',
      'Assign roles/viewer at the project level and restrict with a deny policy',
      'Create a service account and grant it specific API scopes',
      'Use IAM Conditions to restrict roles/compute.admin to read-only operations',
    ],
    a: 0,
    exp: 'Custom IAM roles can be created from scratch or by cloning an existing predefined role and removing permissions. For listing and getting instances, you would include compute.instances.list and compute.instances.get. IAM Conditions filter on resource attributes, not on permission types.',
  },

  // ─── Domain 2: Planning & Configuring a Cloud Solution (11 questions) ───

  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'A batch workload runs nightly for 4 hours and can tolerate interruptions. Which Compute Engine VM pricing model minimizes cost?',
    opts: [
      'On-demand N2 instance with sustained use discount',
      'Committed use contract (1-year) for an N2 instance',
      'Spot VM (previously preemptible)',
      'Sole-tenant node with a custom machine type',
    ],
    a: 2,
    exp: 'Spot VMs offer up to 91% discount over on-demand pricing and are ideal for fault-tolerant, interruptible batch workloads. The nightly 4-hour window means restarts due to preemption are acceptable, making Spot the most cost-effective option.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'You need to run a machine learning training job that requires high-performance GPUs. Which GPU types are available on Compute Engine for ML workloads?',
    opts: [
      'NVIDIA K80 and NVIDIA P100 only',
      'NVIDIA T4 for inference and NVIDIA A100 for training workloads',
      'AMD Radeon Pro and NVIDIA RTX 3090',
      'Intel Iris Pro graphics integrated into C2 instances',
    ],
    a: 1,
    exp: 'Google Cloud offers NVIDIA T4 GPUs (optimized for inference and light training) and NVIDIA A100 GPUs (optimized for large-scale ML training). C2 instances are compute-optimized CPU machines and do not include GPUs.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'Your application requires an in-memory data store with sub-millisecond latency for session caching. Which GCP service is most appropriate?',
    opts: [
      'Cloud Spanner',
      'Cloud Bigtable',
      'Memorystore for Redis',
      'Cloud SQL with read replicas',
    ],
    a: 2,
    exp: 'Memorystore is a fully managed Redis and Memcached service on GCP that provides sub-millisecond latency for caching use cases like session storage. Cloud Spanner and Cloud SQL are relational databases with higher latency than in-memory stores.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'A company needs a globally distributed, strongly consistent relational database with 99.999% availability SLA. Which service should they choose?',
    opts: [
      'Cloud SQL with cross-region read replicas',
      'Cloud Spanner',
      'Cloud Bigtable with replication',
      'Firestore in Datastore mode',
    ],
    a: 1,
    exp: 'Cloud Spanner is Google\'s globally distributed relational database offering strong consistency, horizontal scaling, and a 99.999% multi-region SLA. Cloud SQL read replicas provide regional failover but not true global strong consistency.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'Your application needs shared file storage (NFS) accessible by multiple Compute Engine VMs simultaneously. Which storage option is appropriate?',
    opts: [
      'Cloud Storage bucket mounted via gcsfuse',
      'Regional Persistent Disk attached to each VM',
      'Filestore (managed NFS)',
      'Local SSD on each VM with data syncing',
    ],
    a: 2,
    exp: 'Filestore is GCP\'s managed NFS file storage service that allows multiple Compute Engine VMs to mount the same share concurrently over NFS. Regional Persistent Disks can only be attached to one VM at a time in read-write mode, and gcsfuse is not NFS.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'A memory-optimized workload (SAP HANA) requires a VM with over 3 TB of RAM. Which Compute Engine machine series is designed for this requirement?',
    opts: [
      'N2 general-purpose series',
      'C2 compute-optimized series',
      'E2 cost-optimized series',
      'M2 memory-optimized series',
    ],
    a: 3,
    exp: 'The M2 machine series is designed for memory-intensive workloads and offers instances with up to 12 TB of RAM, making it suitable for large in-memory databases like SAP HANA. C2 is optimized for compute, not memory, and N2/E2 have much lower memory ceilings.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'You want to reduce compute costs for a steady-state workload running 24/7 for the next 3 years. Which pricing strategy offers the greatest discount over on-demand pricing?',
    opts: [
      'Sustained use discounts applied automatically',
      '3-year committed use contracts (resource-based)',
      'Spot VMs with restart logic',
      '1-year committed use contracts (resource-based)',
    ],
    a: 1,
    exp: '3-year committed use contracts provide up to 57% discount over on-demand pricing for resource-based commitments. 1-year contracts provide around 37% discount. Sustained use discounts are automatic but cap at around 30% for a full month.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'Your application serves users globally and needs HTTP(S) load balancing with SSL termination and a single anycast IP. Which load balancer type should you use?',
    opts: [
      'Regional external TCP/UDP Network Load Balancer',
      'Internal TCP/UDP Load Balancer',
      'Global external HTTP(S) Load Balancer',
      'Regional internal HTTP(S) Load Balancer',
    ],
    a: 2,
    exp: 'The Global external HTTP(S) Load Balancer provides a single global anycast IP, SSL termination, URL-based routing, and distributes traffic to backends across regions. Network Load Balancers are layer 4 and regional, not suitable for HTTP/S with a single global IP.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'A team is designing a VPC and needs private IP addressing that does not overlap with their on-premises network (10.0.0.0/8). Which CIDR range is a valid choice for the VPC subnet?',
    opts: [
      '10.128.0.0/20',
      '172.16.0.0/12',
      '192.168.1.0/24',
      '10.0.0.0/16',
    ],
    a: 1,
    exp: '172.16.0.0/12 is an RFC 1918 private range that does not overlap with 10.0.0.0/8, making it suitable when on-premises uses the entire 10.x.x.x space. 10.128.0.0/20 and 10.0.0.0/16 are both within the 10.0.0.0/8 block and would overlap.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'An application needs a NoSQL database capable of serving millions of reads/writes per second for a time-series IoT dataset with high throughput requirements. Which GCP service should you select?',
    opts: [
      'Firestore in Native mode',
      'Cloud SQL for PostgreSQL',
      'Cloud Bigtable',
      'Cloud Spanner',
    ],
    a: 2,
    exp: 'Cloud Bigtable is a fully managed, wide-column NoSQL database optimized for massive throughput with low latency, making it ideal for time-series, IoT, and analytical workloads at petabyte scale. Firestore is optimized for document-oriented mobile/web data, not high-throughput IoT.',
  },
  {
    domain: 'Planning & Configuring a Cloud Solution',
    q: 'You need to serve static website assets globally with low latency. Which combination of GCP services achieves this most effectively?',
    opts: [
      'Compute Engine VMs in multiple regions behind a Network Load Balancer',
      'Cloud Storage bucket with Cloud CDN enabled via an HTTP(S) Load Balancer backend bucket',
      'Cloud Run with regional deployments and Cloud DNS geolocation routing',
      'App Engine Standard with multi-region deployment and Cloud Armor',
    ],
    a: 1,
    exp: 'Cloud Storage serves static content, and enabling Cloud CDN through an HTTP(S) Load Balancer backend bucket caches content at Google\'s edge PoPs globally, delivering assets with low latency. This is the standard pattern for static asset delivery on GCP.',
  },

  // ─── Domain 3: Deploying & Implementing Cloud Solutions (16 questions) ───

  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You want to deploy a Managed Instance Group that automatically scales based on CPU utilization. Which Compute Engine features must be configured?',
    opts: [
      'An instance template and an autoscaling policy attached to the MIG',
      'A single instance with a startup script and manual scaling rules',
      'A sole-tenant node group with CPU threshold monitoring',
      'A target pool with health checks and instance group manager',
    ],
    a: 0,
    exp: 'A Managed Instance Group requires an instance template (which defines the VM configuration) and an autoscaling policy that specifies the scaling metric (e.g., CPU utilization target). The MIG uses these to create and delete VMs automatically.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'A startup script needs to run on every Compute Engine VM at boot time to install software. How do you configure this at scale using instance templates?',
    opts: [
      'SSH into each VM after creation and run the script manually',
      'Add the script content to the instance template\'s metadata key "startup-script"',
      'Use Cloud Scheduler to trigger the script via Cloud Functions after VM creation',
      'Store the script in Cloud Storage and reference it in the instance template firewall rules',
    ],
    a: 1,
    exp: 'Instance templates support a "startup-script" metadata key whose value is the script content, or a "startup-script-url" pointing to a script in Cloud Storage. The script runs automatically on every VM created from that template at each boot.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You need to create a GKE cluster for production with nodes in three zones for high availability. Which gcloud command achieves this?',
    opts: [
      'gcloud container clusters create prod-cluster --zone=us-central1-a --num-nodes=3',
      'gcloud container clusters create prod-cluster --region=us-central1 --num-nodes=3',
      'gcloud container clusters create prod-cluster --multi-zone=us-central1-a,us-central1-b,us-central1-c',
      'gcloud container clusters create prod-cluster --zone=us-central1 --node-zones=3',
    ],
    a: 1,
    exp: 'Creating a regional GKE cluster with "--region=us-central1" automatically spreads nodes across all zones in that region (a, b, c). The "--num-nodes=3" flag means 3 nodes per zone, giving 9 total nodes and zone-level HA.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'A Kubernetes Deployment needs to store database credentials securely and inject them as environment variables into pods. What Kubernetes object should be used?',
    opts: [
      'ConfigMap with base64-encoded values',
      'Secret referenced in the Deployment spec as env variables or volume mounts',
      'PersistentVolume with credential files stored in Cloud Storage',
      'ServiceAccount annotations with the credentials inline',
    ],
    a: 1,
    exp: 'Kubernetes Secrets are designed to store sensitive data like credentials. They can be injected into pods as environment variables or mounted as files. ConfigMaps are for non-sensitive configuration data and should not store credentials.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You want to build a container image and push it to Artifact Registry as part of a CI/CD pipeline on GCP. Which service provides a managed build environment?',
    opts: [
      'Cloud Scheduler with a Docker build task',
      'Cloud Build with a cloudbuild.yaml configuration file',
      'Compute Engine VM with Docker installed and manual push',
      'Cloud Run Jobs triggered on every code commit',
    ],
    a: 1,
    exp: 'Cloud Build is GCP\'s fully managed CI/CD platform. A cloudbuild.yaml file defines build steps (e.g., docker build, docker push) and Cloud Build executes them in a scalable, serverless environment with direct integration to Artifact Registry.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You deploy a new version of your Cloud Run service and want to send 10% of traffic to it for canary testing while keeping 90% on the stable version. How do you configure this?',
    opts: [
      'Deploy two separate Cloud Run services and use Cloud DNS weighted routing',
      'Use traffic splitting in Cloud Run to assign traffic percentages to specific revisions',
      'Configure a Cloud Load Balancer with weighted backend services',
      'Use Cloud Endpoints to route traffic based on a percentage header',
    ],
    a: 1,
    exp: 'Cloud Run natively supports traffic splitting between revisions. You can use "gcloud run services update-traffic" or the console to assign specific percentage weights to each revision, enabling canary deployments without external load balancers.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You need to run a Cloud Function that triggers whenever a new file is uploaded to a Cloud Storage bucket. Which trigger type should you configure?',
    opts: [
      'HTTP trigger with a webhook from Cloud Storage notifications',
      'Cloud Storage trigger (Eventarc or direct Cloud Storage trigger)',
      'Pub/Sub trigger with a topic manually subscribed to the bucket',
      'Cloud Scheduler trigger polling the bucket every minute',
    ],
    a: 1,
    exp: 'Cloud Functions (and Cloud Run functions gen2) support direct Cloud Storage triggers that fire on object finalize, delete, archive, or metadata update events. This is more reliable and simpler than manual Pub/Sub subscription setup.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'An App Engine application needs to route 20% of requests to a new version for testing while the rest go to the stable version. Which feature enables this?',
    opts: [
      'App Engine dispatch.yaml routing rules',
      'App Engine traffic splitting between versions',
      'Cloud Load Balancing with weighted backend services pointing to App Engine',
      'Cloud Endpoints with traffic management policies',
    ],
    a: 1,
    exp: 'App Engine has built-in traffic splitting that allows you to divide incoming requests across multiple versions by percentage, IP address, or cookie. This is configured via the console or gcloud and requires no external load balancer changes.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You want to connect a Cloud Run service to a Cloud SQL (PostgreSQL) instance securely. What is the recommended approach?',
    opts: [
      'Use a public IP with SSL and allowlist the Cloud Run egress IP',
      'Use the Cloud SQL Auth Proxy via the Cloud Run service\'s "--add-cloudsql-instances" flag',
      'Connect directly over VPC using the Cloud SQL private IP without any proxy',
      'Store the connection string in an environment variable and connect with psycopg2 directly',
    ],
    a: 1,
    exp: 'Cloud Run integrates with Cloud SQL via the Cloud SQL Auth Proxy, configured with the "--add-cloudsql-instances" flag. The proxy handles IAM-based authentication and encrypted connections without exposing a public IP or managing SSL certificates manually.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'A Cloud SQL instance needs to be protected against data loss from regional outages. Which Cloud SQL feature provides cross-region redundancy?',
    opts: [
      'Read replicas in the same region',
      'Point-in-time recovery (PITR) with automated backups',
      'Cross-region read replica promoted to primary in a failover scenario',
      'Cloud SQL high-availability with a standby instance in the same zone',
    ],
    a: 2,
    exp: 'Cross-region read replicas can be promoted to a standalone primary instance if the primary region becomes unavailable, providing cross-region redundancy. Same-region HA standby instances only protect against zone failures, not regional outages.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You use Terraform to manage GCP infrastructure. After modifying a Terraform configuration to add a new firewall rule, what is the correct sequence of commands to apply the change?',
    opts: [
      'terraform validate → terraform apply → terraform plan',
      'terraform init → terraform plan → terraform apply',
      'terraform refresh → terraform destroy → terraform apply',
      'terraform fmt → terraform apply → terraform state',
    ],
    a: 1,
    exp: '"terraform init" initializes the working directory and downloads providers. "terraform plan" shows what changes will be made. "terraform apply" executes the changes. This is the standard Terraform workflow for deploying infrastructure changes.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You need to copy a large number of objects from one Cloud Storage bucket to another in the same project. Which gsutil command is most efficient?',
    opts: [
      'gsutil cp -r gs://source-bucket/* gs://dest-bucket/',
      'gsutil rsync -r gs://source-bucket gs://dest-bucket',
      'gsutil mv gs://source-bucket/* gs://dest-bucket/',
      'gsutil rewrite -r gs://source-bucket gs://dest-bucket',
    ],
    a: 1,
    exp: '"gsutil rsync -r" is the most efficient for syncing large numbers of objects between buckets because it only copies objects that are new or changed, avoiding redundant transfers. "cp -r" copies everything including already-existing objects.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You want objects in a Cloud Storage bucket to automatically transition to Coldline storage after 90 days and be deleted after 365 days. How do you configure this?',
    opts: [
      'Set CORS rules on the bucket specifying age-based transitions',
      'Create a lifecycle management policy on the bucket with SetStorageClass and Delete actions',
      'Use a Cloud Scheduler job that calls the Storage API nightly',
      'Configure retention policies on the bucket with a 365-day retention period',
    ],
    a: 1,
    exp: 'Cloud Storage lifecycle management policies allow you to define rules that automatically change an object\'s storage class (SetStorageClass action) after a specified number of days and delete objects (Delete action) after a set age. This requires no external scheduling.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'A developer needs to share a specific object in a private Cloud Storage bucket with an external partner for 24 hours without granting them GCP access. What should you use?',
    opts: [
      'Make the bucket temporarily public and share the object URL',
      'Grant the partner a temporary roles/storage.objectViewer IAM binding',
      'Generate a signed URL with a 24-hour expiration using a service account',
      'Share the bucket via Cloud Storage Transfer Service',
    ],
    a: 2,
    exp: 'Signed URLs provide time-limited access to a specific Cloud Storage object for users who don\'t have GCP credentials. They are signed using a service account key or impersonation and expire after the configured duration (up to 7 days for V4 signatures).',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You want to deploy a containerized application that handles HTTP requests, scales to zero when idle, and bills only for actual request processing time. Which GCP service fits these requirements?',
    opts: [
      'GKE Autopilot with Horizontal Pod Autoscaler',
      'Compute Engine Managed Instance Group with autoscaling to 0',
      'Cloud Run',
      'App Engine Flexible environment',
    ],
    a: 2,
    exp: 'Cloud Run is a fully managed container platform that scales to zero when there are no requests, charges only for CPU and memory used during request processing, and handles HTTP traffic natively. GKE cannot easily scale to zero at the node level, and MIGs have minimum instance constraints.',
  },
  {
    domain: 'Deploying & Implementing Cloud Solutions',
    q: 'You need to run a batch data processing container that executes once, processes a dataset to completion, and then exits. Which serverless option is most appropriate?',
    opts: [
      'Cloud Run (request-driven service)',
      'Cloud Run Jobs',
      'Cloud Functions with a long timeout',
      'App Engine Cron tasks',
    ],
    a: 1,
    exp: 'Cloud Run Jobs are designed for containerized tasks that run to completion and exit, rather than continuously serving requests. They support parallelism, retries, and can be triggered manually or by Cloud Scheduler, making them ideal for batch processing.',
  },

  // ─── Domain 4: Ensuring Successful Operation (13 questions) ───

  {
    domain: 'Ensuring Successful Operation',
    q: 'Your team wants to receive an email alert when the 99th percentile latency of a Cloud Run service exceeds 2 seconds for 5 consecutive minutes. What Cloud Monitoring components must you configure?',
    opts: [
      'A log-based metric filter and a Cloud Function that sends email on match',
      'An alerting policy with a metric threshold condition and a notification channel',
      'A Cloud Monitoring dashboard widget with an email notification on breach',
      'An uptime check for the Cloud Run URL with email notification',
    ],
    a: 1,
    exp: 'Cloud Monitoring alerting policies define conditions (e.g., metric threshold) and notification channels (e.g., email, PagerDuty). You create a condition on the Cloud Run request latency metric (p99) and attach an email notification channel to receive alerts.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'You need to monitor whether your external HTTPS endpoint is reachable from multiple global locations and alert if it goes down. Which Cloud Monitoring feature provides this?',
    opts: [
      'Custom metric with a Compute Engine agent reporting from each region',
      'Uptime check configured for the URL with an alerting policy',
      'Cloud Trace sampling with error rate thresholds',
      'VPC Flow Logs with a log-based alert on connection failures',
    ],
    a: 1,
    exp: 'Cloud Monitoring uptime checks probe your endpoint from multiple global locations on a configurable schedule and can trigger alerting policies if the endpoint fails to respond. This is the purpose-built feature for external endpoint monitoring.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'An operations team wants to archive all Cloud Audit Logs to Cloud Storage for compliance for 7 years. What must they configure?',
    opts: [
      'Enable Cloud Audit Logs and set the log retention period to 7 years in Log Analytics',
      'Create a log sink from Cloud Logging to a Cloud Storage bucket with an appropriate filter',
      'Use Cloud Scheduler to export logs from the Logging API to Cloud Storage nightly',
      'Enable BigQuery log export and configure a BigQuery table expiration of 7 years',
    ],
    a: 1,
    exp: 'Log sinks in Cloud Logging route log entries matching a filter to a destination such as Cloud Storage, BigQuery, or Pub/Sub. For long-term archival, you create a sink targeting a Cloud Storage bucket; Cloud Storage\'s default log retention is only 30 days.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'A developer wants to query log data with SQL and perform ad-hoc analysis on application logs. Where should you route logs from Cloud Logging?',
    opts: [
      'Cloud Storage bucket for BigQuery federated queries',
      'Pub/Sub topic for downstream processing',
      'BigQuery dataset via a log sink',
      'Cloud Monitoring log-based metrics',
    ],
    a: 2,
    exp: 'Routing logs to a BigQuery dataset via a log sink allows the team to run SQL queries directly against log data using BigQuery\'s analytics engine. Log Analytics in Cloud Logging also supports SQL, but BigQuery provides the most flexible ad-hoc querying.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'Your application logs contain structured JSON with an "error_code" field. You want to alert when the count of logs with error_code=500 exceeds 10 per minute. What should you create?',
    opts: [
      'A Cloud Monitoring uptime check with a custom header',
      'A log-based metric counting matching log entries, then an alerting policy on that metric',
      'An Error Reporting rule that fires when 10 errors accumulate',
      'A Cloud Trace latency threshold alert for 500-status responses',
    ],
    a: 1,
    exp: 'Log-based metrics extract numeric metrics from log entries matching a filter. You create a counter metric filtering for error_code=500, then create a Cloud Monitoring alerting policy with a threshold on that metric to trigger alerts when the count exceeds 10 per minute.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'You need to perform a rolling update of a GKE Deployment to a new container image with zero downtime. What is the default GKE update strategy that achieves this?',
    opts: [
      'Recreate strategy, which terminates all old pods before creating new ones',
      'RollingUpdate strategy with maxUnavailable=0 and maxSurge=1',
      'Blue/green deployment using two separate Deployments',
      'Canary deployment with manual traffic splitting in the Ingress resource',
    ],
    a: 1,
    exp: 'Kubernetes RollingUpdate is the default Deployment strategy. Setting maxUnavailable=0 ensures no pods are terminated before new ones are ready, and maxSurge=1 allows one extra pod to be created during the rollout, achieving zero-downtime updates.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'A Cloud SQL primary instance has become unresponsive. Your instance is configured with high availability. How does failover occur?',
    opts: [
      'You must manually promote the read replica to primary via the console',
      'Cloud SQL automatically fails over to the standby instance in the same region within minutes',
      'Traffic automatically routes to the nearest cross-region read replica',
      'You must restore from the most recent backup to a new instance',
    ],
    a: 1,
    exp: 'Cloud SQL HA uses a standby instance in a different zone within the same region. When the primary fails, Cloud SQL automatically promotes the standby and updates the connection endpoint (same IP) within 1–2 minutes, requiring no manual intervention.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'Your GKE cluster\'s node pool needs to be upgraded to a newer Kubernetes version. What is the recommended upgrade approach to minimize disruption?',
    opts: [
      'Delete the node pool and create a new one with the target version',
      'Use GKE\'s node pool upgrade (surge upgrade) which adds new nodes before draining old ones',
      'Manually cordon and drain each node, then update the node image',
      'Create a new cluster and migrate workloads manually',
    ],
    a: 1,
    exp: 'GKE\'s surge upgrade strategy creates new nodes with the target version, migrates pods to them, and then removes old nodes. This maintains cluster capacity during upgrades. GKE can also perform upgrades automatically via Release Channels.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'An application is hitting GCP quota limits for Compute Engine API requests. What is the correct process to resolve this?',
    opts: [
      'Delete unused projects to free up quota automatically',
      'Submit a quota increase request via the IAM & Admin > Quotas page in the console',
      'Move to a different region where quota is not exhausted',
      'Create a new project and split the workload to avoid per-project limits',
    ],
    a: 1,
    exp: 'GCP quota increases are requested through the Quotas page in the console or via the Service Usage API. Google reviews requests and typically approves them for legitimate use cases. Quotas are per-project and per-region, so moving regions may help for regional quotas, but the correct process is a formal request.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'You suspect a networking issue is causing packet loss between two Compute Engine VMs. Which GCP tool helps you diagnose VPC connectivity problems?',
    opts: [
      'Cloud Trace for distributed tracing between VMs',
      'VPC Network Intelligence Center (Connectivity Tests)',
      'Cloud Logging with VPC Flow Logs filtered by source IP',
      'Cloud Monitoring with a custom network latency metric',
    ],
    a: 1,
    exp: 'VPC Network Intelligence Center\'s Connectivity Tests analyze the data plane and control plane to verify whether a packet with specific attributes (source, destination, protocol, port) can flow between two endpoints, identifying firewall or routing issues.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'A Cloud Monitoring SLO is defined for a service with a 99.9% availability target. The error budget is nearly exhausted. What action should the team take?',
    opts: [
      'Ignore it until the 30-day rolling window resets',
      'Freeze new feature deployments and focus engineering effort on reliability improvements',
      'Increase the SLO target to 99.5% to prevent further budget burn',
      'Disable alerting until the error budget recovers',
    ],
    a: 1,
    exp: 'When an error budget is nearly exhausted, the SRE practice is to pause risky changes (new features) and redirect engineering effort to reliability work. Lowering the SLO target avoids the issue rather than solving it and reduces the reliability guarantee to users.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'An IAM user reports they cannot access a Cloud Storage bucket despite having roles/storage.objectViewer at the project level. The bucket has a deny policy. What should you investigate first?',
    opts: [
      'Check if the bucket is in a different project and the role binding is on the wrong project',
      'Check if a deny policy or uniform bucket-level access overrides the project-level IAM binding',
      'Remove and re-add the IAM binding to force replication',
      'Check if the user\'s browser is caching old credentials',
    ],
    a: 1,
    exp: 'IAM deny policies and bucket-level uniform access control can override inherited project-level bindings. A deny policy explicitly blocks a permission even if an allow binding exists. Uniform bucket-level access disables legacy ACLs but should not block IAM bindings.',
  },
  {
    domain: 'Ensuring Successful Operation',
    q: 'You want to track the number of HTTP 5xx responses returned by your App Engine application over time using Cloud Monitoring. What is the correct approach?',
    opts: [
      'Parse App Engine logs in Cloud Logging and manually count 5xx entries',
      'Use the built-in App Engine response code metric (appengine.googleapis.com/http/server/response_count) filtered to 5xx codes',
      'Deploy a custom agent on App Engine instances to emit error count metrics',
      'Configure Error Reporting and use it as the metric source in Cloud Monitoring',
    ],
    a: 1,
    exp: 'App Engine automatically emits HTTP response count metrics to Cloud Monitoring, broken down by response code. You can filter or aggregate the "appengine.googleapis.com/http/server/response_count" metric by response code to chart 5xx errors without any custom instrumentation.',
  },

  // ─── Domain 5: Configuring Access & Security (14 questions) ───

  {
    domain: 'Configuring Access & Security',
    q: 'A GKE workload needs to read objects from Cloud Storage without storing a service account key. What is the recommended authentication approach?',
    opts: [
      'Mount a service account JSON key as a Kubernetes Secret and reference it in the Pod spec',
      'Use Workload Identity to bind the Kubernetes ServiceAccount to a GCP service account',
      'Grant the GKE node service account roles/storage.objectViewer and rely on the node identity',
      'Use API keys restricted to the Cloud Storage API',
    ],
    a: 1,
    exp: 'Workload Identity is the recommended way for GKE workloads to authenticate to GCP APIs. It binds a Kubernetes ServiceAccount to a GCP service account, allowing pods to obtain short-lived credentials without any key files. Using node identity grants all pods on the node the same permissions, violating least privilege.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'A VPC firewall rule is needed to allow only HTTPS traffic (TCP port 443) from any source to instances tagged "web-server". Which firewall rule configuration is correct?',
    opts: [
      'Direction: Egress, Target: web-server tag, Protocol: TCP, Port: 443, Source: 0.0.0.0/0',
      'Direction: Ingress, Target: web-server tag, Protocol: TCP, Port: 443, Source: 0.0.0.0/0',
      'Direction: Ingress, Target: all instances, Protocol: TCP, Port: 443, Source: web-server tag',
      'Direction: Egress, Target: all instances, Protocol: TCP, Port: 443, Destination: 0.0.0.0/0',
    ],
    a: 1,
    exp: 'To allow incoming HTTPS traffic to specific instances, you need an Ingress firewall rule targeting instances with the "web-server" network tag, allowing TCP port 443 from source 0.0.0.0/0. Egress rules control outbound traffic, not inbound.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'Two VPC firewall rules exist for the same instance: Rule A (priority 500) allows SSH from 0.0.0.0/0, and Rule B (priority 1000) denies SSH from 0.0.0.0/0. What is the result?',
    opts: [
      'Rule B takes effect because deny rules always override allow rules',
      'Rule A takes effect because lower priority numbers have higher precedence',
      'Both rules conflict and SSH is blocked by default',
      'The rules are merged and SSH is allowed from internal IPs only',
    ],
    a: 1,
    exp: 'GCP firewall rules use numeric priority where lower numbers have higher precedence. Priority 500 is evaluated before priority 1000, so Rule A (allow) wins over Rule B (deny). Unlike AWS security groups, GCP does not auto-deny; the first matching rule is applied.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'You need to protect sensitive GCP APIs (Cloud Storage, BigQuery) from being accessed from outside your organization\'s network perimeter, even by authenticated users. Which feature provides this?',
    opts: [
      'VPC firewall rules blocking external API calls',
      'VPC Service Controls with a service perimeter',
      'Cloud Armor with an IP allowlist',
      'IAM Conditions restricting access by IP address',
    ],
    a: 1,
    exp: 'VPC Service Controls creates a security perimeter around GCP services, preventing data exfiltration and restricting API access to only requests from within the perimeter (specific VPCs, IP ranges, or identities). It operates at the API level, not just the network level.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'Your web application is being targeted by a SQL injection attack from specific IP ranges. Which GCP service can block these requests at the edge before they reach your backend?',
    opts: [
      'Cloud Armor security policy attached to the HTTP(S) Load Balancer',
      'VPC firewall rules on the backend Compute Engine instances',
      'Cloud IDS with inline blocking mode',
      'Identity-Aware Proxy with IP-based access levels',
    ],
    a: 0,
    exp: 'Cloud Armor provides WAF capabilities including preconfigured rules for OWASP Top 10 threats (SQL injection, XSS) and custom rules to block/allow by IP, geo, or request attributes. It is attached to the HTTP(S) Load Balancer and acts at the edge.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'You want to encrypt a Cloud Storage bucket with a customer-managed encryption key (CMEK). What must you do?',
    opts: [
      'Enable customer-supplied encryption keys (CSEK) by uploading a key via gsutil',
      'Create a key ring and key in Cloud KMS, then specify the key when creating or updating the bucket',
      'Enable Google-managed encryption and configure a rotation schedule',
      'Use Secret Manager to store the encryption key and reference it in the bucket configuration',
    ],
    a: 1,
    exp: 'CMEK requires creating a Cloud KMS key ring and key, then granting the Cloud Storage service account the roles/cloudkms.cryptoKeyEncrypterDecrypter role on the key. You then specify the KMS key when creating the bucket or set it as the default key.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'A service account key was accidentally committed to a public GitHub repository. What is the immediate remediation?',
    opts: [
      'Rotate the key by creating a new one and deleting the compromised key immediately',
      'Revoke all IAM permissions from the service account temporarily',
      'Delete the commit from GitHub history and monitor for unauthorized activity',
      'Change the service account display name to prevent attackers from identifying it',
    ],
    a: 0,
    exp: 'The immediate action is to disable or delete the compromised key via IAM & Admin > Service Accounts, which revokes its ability to authenticate. You then create a new key for legitimate use. Simply removing it from GitHub is insufficient because the key may already have been scraped.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'An application stores database passwords in Secret Manager. A developer needs to retrieve the latest version of a secret in code. Which API call pattern is correct?',
    opts: [
      'GET /v1/projects/PROJECT/secrets/SECRET/versions/1',
      'GET /v1/projects/PROJECT/secrets/SECRET/versions/latest:access',
      'GET /v1/projects/PROJECT/secrets/SECRET:getValue',
      'GET /v1/projects/PROJECT/secrets/SECRET/payload',
    ],
    a: 1,
    exp: 'To access the latest version of a secret in Secret Manager, you call the "access" method on the "latest" alias of the secret version resource. The path is "projects/PROJECT/secrets/SECRET/versions/latest" with the ":access" verb appended.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'You want to allow Service Account A to impersonate Service Account B to perform operations, without giving Service Account A any direct permissions. What IAM binding is needed?',
    opts: [
      'Grant Service Account A roles/iam.serviceAccountUser on Service Account B',
      'Grant Service Account A roles/iam.serviceAccountAdmin on Service Account B',
      'Grant Service Account A roles/iam.serviceAccountTokenCreator on Service Account B',
      'Add Service Account A as a member of Service Account B\'s resource policy',
    ],
    a: 2,
    exp: 'roles/iam.serviceAccountTokenCreator grants the ability to create short-lived credentials (OAuth tokens, OIDC tokens) as the target service account, enabling impersonation. roles/iam.serviceAccountUser grants the ability to run jobs as the service account (attach to a VM), which is different from impersonation.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'Binary Authorization is enabled on a GKE cluster. A deployment fails because the container image is not attested. What does this indicate?',
    opts: [
      'The image was not scanned by Container Analysis and has known CVEs',
      'The image lacks a required attestation from an authorized attestor, indicating it has not passed required policy checks',
      'The image is stored in a private registry that GKE cannot access',
      'The GKE cluster is missing the binary authorization webhook configuration',
    ],
    a: 1,
    exp: 'Binary Authorization requires images to have cryptographic attestations from trusted attestors (e.g., a CI/CD system that verified tests passed). Without the required attestation, the admission webhook rejects the deployment. This enforces software supply chain integrity.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'Container Analysis is enabled on Artifact Registry. What does it automatically provide?',
    opts: [
      'Runtime threat detection for containers running in GKE',
      'Vulnerability scanning of container images against known CVE databases',
      'Binary Authorization attestations for all scanned images',
      'Network policy enforcement for containers communicating within a cluster',
    ],
    a: 1,
    exp: 'Container Analysis automatically scans container images stored in Artifact Registry for OS and language package vulnerabilities against CVE databases. It produces vulnerability occurrences accessible via the API. It does not generate Binary Authorization attestations automatically.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'An organization wants to enforce that service accounts cannot have keys created externally (downloaded JSON keys). Which mechanism enforces this at scale?',
    opts: [
      'A Cloud Monitoring alert when a new service account key is created',
      'An Organization Policy constraint (iam.disableServiceAccountKeyCreation)',
      'A custom IAM deny policy removing the iam.serviceAccountKeys.create permission',
      'Enabling Workload Identity Federation at the project level automatically disables keys',
    ],
    a: 1,
    exp: 'The Organization Policy constraint "iam.disableServiceAccountKeyCreation" prevents the creation of new service account keys in a project, folder, or organization. This enforces keyless authentication at scale without relying on manual monitoring.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'A Secret Manager secret needs to be automatically rotated every 90 days. How can you implement automated secret rotation?',
    opts: [
      'Set the secret expiration date to 90 days in Secret Manager settings',
      'Use Cloud Scheduler to trigger a Cloud Function or Cloud Run job that creates a new secret version and notifies dependent systems via Pub/Sub rotation topics',
      'Enable Secret Manager automatic rotation and specify the 90-day interval',
      'Use Cloud KMS automatic key rotation instead of Secret Manager for passwords',
    ],
    a: 1,
    exp: 'Secret Manager supports rotation notifications via Pub/Sub rotation topics. A Cloud Scheduler job can trigger a Cloud Function that generates a new secret value, adds it as a new version, and disables the old version. Secret Manager does not rotate secret values automatically; it only notifies.',
  },
  {
    domain: 'Configuring Access & Security',
    q: 'Cloud Armor is configured with a rate-limiting rule that allows a maximum of 100 requests per minute per client IP. What happens when a client exceeds this threshold?',
    opts: [
      'The client is permanently banned and must be manually removed from the blocklist',
      'Cloud Armor returns a 429 Too Many Requests response or a custom redirect action for requests exceeding the threshold',
      'Cloud Armor forwards the excess requests to a secondary backend for processing',
      'The client is throttled to exactly 100 requests per minute with no error returned',
    ],
    a: 1,
    exp: 'Cloud Armor rate-limiting rules use a "throttle" or "rate_based_ban" action. When the threshold is exceeded, Cloud Armor can return a 429 response, redirect the client, or ban the IP for a configured duration. The excess requests are not transparently queued or forwarded.',
  },

  // ── Additional Associate Cloud Engineer practice questions (35 added) ──

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "A regulated financial institution is designing a Google Associate Cloud Engineer study plan focused on Setting up a Cloud Solution Environment. Which resource topic is essential?",
    opts: [
      "Ignore setting up a cloud solution environment compliance requirements for faster deployment",
      "Follow industry best practices for setting up a cloud solution environment as defined in the Google Associate Cloud Engineer body of knowledge",
      "Mix production and test setting up a cloud solution environment configurations in one environment",
      "Store sensitive setting up a cloud solution environment credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for setting up a cloud solution environment as defined in the Google Associate Cloud Engineer body of knowledge. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "When a healthcare organization implements Google Associate Cloud Engineer controls for Planning & Configuring a Cloud Solution, which practice reduces operational risk?",
    opts: [
      "Mix production and test planning & configuring a cloud solution configurations in one environment",
      "Store sensitive planning & configuring a cloud solution credentials in plain text configuration files",
      "Implement the standard planning & configuring a cloud solution solution that satisfies Google Associate Cloud Engineer domain requirements",
      "Skip planning & configuring a cloud solution testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard planning & configuring a cloud solution solution that satisfies Google Associate Cloud Engineer domain requirements. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "A Google Associate Cloud Engineer practice exam scenario covers Deploying & Implementing Cloud Solutions for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive deploying & implementing cloud solutions credentials in plain text configuration files",
      "Skip deploying & implementing cloud solutions testing before production rollout",
      "Implement deploying & implementing cloud solutions without change management or rollback plans",
      "Use the certified deploying & implementing cloud solutions methodology specified for Google Associate Cloud Engineer candidates",
    ],
    a: 3,
    exp: "Use the certified deploying & implementing cloud solutions methodology specified for Google Associate Cloud Engineer candidates. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "Which Ensuring Successful Operation principle is emphasized in Google Associate Cloud Engineer when supporting a government agency?",
    opts: [
      "Adopt the ensuring successful operation control framework referenced in Google Associate Cloud Engineer study materials",
      "Skip ensuring successful operation testing before production rollout",
      "Implement ensuring successful operation without change management or rollback plans",
      "Use default ensuring successful operation settings without hardening",
    ],
    a: 0,
    exp: "Adopt the ensuring successful operation control framework referenced in Google Associate Cloud Engineer study materials. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "A SaaS startup scaling rapidly failed a mock Google Associate Cloud Engineer question on Configuring Access & Security. What concept should they review?",
    opts: [
      "Implement configuring access & security without change management or rollback plans",
      "Configure configuring access & security according to Google Associate Cloud Engineer exam blueprint recommendations",
      "Use default configuring access & security settings without hardening",
      "Centralize all configuring access & security decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure configuring access & security according to Google Associate Cloud Engineer exam blueprint recommendations. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "For Google Associate Cloud Engineer certification, Setting up a Cloud Solution Environment knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Use default setting up a cloud solution environment settings without hardening",
      "Centralize all setting up a cloud solution environment decisions without stakeholder review",
      "Select the setting up a cloud solution environment option that meets Google Associate Cloud Engineer security and governance standards",
      "Deprecate setting up a cloud solution environment controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the setting up a cloud solution environment option that meets Google Associate Cloud Engineer security and governance standards. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "A team at a media company with global users debates Planning & Configuring a Cloud Solution options while studying Google Associate Cloud Engineer. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all planning & configuring a cloud solution decisions without stakeholder review",
      "Deprecate planning & configuring a cloud solution controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses planning & configuring a cloud solution policies",
      "Design planning & configuring a cloud solution using patterns validated in Google Associate Cloud Engineer practice assessments",
    ],
    a: 3,
    exp: "Design planning & configuring a cloud solution using patterns validated in Google Associate Cloud Engineer practice assessments. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "Which Deploying & Implementing Cloud Solutions capability is validated by Google Associate Cloud Engineer for organizations such as a multinational enterprise?",
    opts: [
      "Apply the Google Associate Cloud Engineer-aligned deploying & implementing cloud solutions approach recommended in official exam objectives",
      "Deprecate deploying & implementing cloud solutions controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses deploying & implementing cloud solutions policies",
      "Disable monitoring for deploying & implementing cloud solutions to improve performance",
    ],
    a: 0,
    exp: "Apply the Google Associate Cloud Engineer-aligned deploying & implementing cloud solutions approach recommended in official exam objectives. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "When evaluating Ensuring Successful Operation tools for Google Associate Cloud Engineer, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Use an undocumented workaround that bypasses ensuring successful operation policies",
      "Follow industry best practices for ensuring successful operation as defined in the Google Associate Cloud Engineer body of knowledge",
      "Disable monitoring for ensuring successful operation to improve performance",
      "Grant excessive privileges that violate ensuring successful operation least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for ensuring successful operation as defined in the Google Associate Cloud Engineer body of knowledge. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "A healthcare organization must document Configuring Access & Security procedures for Google Associate Cloud Engineer compliance. Which standard applies?",
    opts: [
      "Disable monitoring for configuring access & security to improve performance",
      "Grant excessive privileges that violate configuring access & security least-privilege principles",
      "Implement the standard configuring access & security solution that satisfies Google Associate Cloud Engineer domain requirements",
      "Rely solely on manual processes with no configuring access & security automation",
    ],
    a: 2,
    exp: "Implement the standard configuring access & security solution that satisfies Google Associate Cloud Engineer domain requirements. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "A Google Associate Cloud Engineer instructor asks about Setting up a Cloud Solution Environment in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate setting up a cloud solution environment least-privilege principles",
      "Rely solely on manual processes with no setting up a cloud solution environment automation",
      "Ignore setting up a cloud solution environment compliance requirements for faster deployment",
      "Use the certified setting up a cloud solution environment methodology specified for Google Associate Cloud Engineer candidates",
    ],
    a: 3,
    exp: "Use the certified setting up a cloud solution environment methodology specified for Google Associate Cloud Engineer candidates. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "Which Planning & Configuring a Cloud Solution metric best indicates Google Associate Cloud Engineer readiness for a government agency?",
    opts: [
      "Adopt the planning & configuring a cloud solution control framework referenced in Google Associate Cloud Engineer study materials",
      "Rely solely on manual processes with no planning & configuring a cloud solution automation",
      "Ignore planning & configuring a cloud solution compliance requirements for faster deployment",
      "Mix production and test planning & configuring a cloud solution configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the planning & configuring a cloud solution control framework referenced in Google Associate Cloud Engineer study materials. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "A SaaS startup scaling rapidly is troubleshooting a Deploying & Implementing Cloud Solutions issue while preparing for Google Associate Cloud Engineer. What is the first step?",
    opts: [
      "Ignore deploying & implementing cloud solutions compliance requirements for faster deployment",
      "Configure deploying & implementing cloud solutions according to Google Associate Cloud Engineer exam blueprint recommendations",
      "Mix production and test deploying & implementing cloud solutions configurations in one environment",
      "Store sensitive deploying & implementing cloud solutions credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure deploying & implementing cloud solutions according to Google Associate Cloud Engineer exam blueprint recommendations. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "In Google Associate Cloud Engineer, how should a manufacturing company modernizing IT handle a trade-off involving Ensuring Successful Operation?",
    opts: [
      "Mix production and test ensuring successful operation configurations in one environment",
      "Store sensitive ensuring successful operation credentials in plain text configuration files",
      "Select the ensuring successful operation option that meets Google Associate Cloud Engineer security and governance standards",
      "Skip ensuring successful operation testing before production rollout",
    ],
    a: 2,
    exp: "Select the ensuring successful operation option that meets Google Associate Cloud Engineer security and governance standards. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "Which Configuring Access & Security pattern is commonly tested on Google Associate Cloud Engineer for scenarios involving a media company with global users?",
    opts: [
      "Store sensitive configuring access & security credentials in plain text configuration files",
      "Skip configuring access & security testing before production rollout",
      "Implement configuring access & security without change management or rollback plans",
      "Design configuring access & security using patterns validated in Google Associate Cloud Engineer practice assessments",
    ],
    a: 3,
    exp: "Design configuring access & security using patterns validated in Google Associate Cloud Engineer practice assessments. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "A multinational enterprise is preparing for Google Associate Cloud Engineer and must strengthen Setting up a Cloud Solution Environment. Which option is BEST?",
    opts: [
      "Apply the Google Associate Cloud Engineer-aligned setting up a cloud solution environment approach recommended in official exam objectives",
      "Skip setting up a cloud solution environment testing before production rollout",
      "Implement setting up a cloud solution environment without change management or rollback plans",
      "Use default setting up a cloud solution environment settings without hardening",
    ],
    a: 0,
    exp: "Apply the Google Associate Cloud Engineer-aligned setting up a cloud solution environment approach recommended in official exam objectives. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "During a Google Associate Cloud Engineer readiness review at a regulated financial institution, which Planning & Configuring a Cloud Solution approach meets certification objectives?",
    opts: [
      "Implement planning & configuring a cloud solution without change management or rollback plans",
      "Follow industry best practices for planning & configuring a cloud solution as defined in the Google Associate Cloud Engineer body of knowledge",
      "Use default planning & configuring a cloud solution settings without hardening",
      "Centralize all planning & configuring a cloud solution decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for planning & configuring a cloud solution as defined in the Google Associate Cloud Engineer body of knowledge. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "A consultant advising a healthcare organization on Google Associate Cloud Engineer recommends improvements to Deploying & Implementing Cloud Solutions. What should they implement?",
    opts: [
      "Use default deploying & implementing cloud solutions settings without hardening",
      "Centralize all deploying & implementing cloud solutions decisions without stakeholder review",
      "Implement the standard deploying & implementing cloud solutions solution that satisfies Google Associate Cloud Engineer domain requirements",
      "Deprecate deploying & implementing cloud solutions controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard deploying & implementing cloud solutions solution that satisfies Google Associate Cloud Engineer domain requirements. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "Which Ensuring Successful Operation strategy is MOST appropriate when a high-traffic e-commerce platform adopts Google Associate Cloud Engineer standards?",
    opts: [
      "Centralize all ensuring successful operation decisions without stakeholder review",
      "Deprecate ensuring successful operation controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses ensuring successful operation policies",
      "Use the certified ensuring successful operation methodology specified for Google Associate Cloud Engineer candidates",
    ],
    a: 3,
    exp: "Use the certified ensuring successful operation methodology specified for Google Associate Cloud Engineer candidates. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "An audit of a government agency reveals gaps in Configuring Access & Security for Google Associate Cloud Engineer. Which remediation is CORRECT?",
    opts: [
      "Adopt the configuring access & security control framework referenced in Google Associate Cloud Engineer study materials",
      "Deprecate configuring access & security controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses configuring access & security policies",
      "Disable monitoring for configuring access & security to improve performance",
    ],
    a: 0,
    exp: "Adopt the configuring access & security control framework referenced in Google Associate Cloud Engineer study materials. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "A SaaS startup scaling rapidly is designing a Google Associate Cloud Engineer study plan focused on Setting up a Cloud Solution Environment. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses setting up a cloud solution environment policies",
      "Configure setting up a cloud solution environment according to Google Associate Cloud Engineer exam blueprint recommendations",
      "Disable monitoring for setting up a cloud solution environment to improve performance",
      "Grant excessive privileges that violate setting up a cloud solution environment least-privilege principles",
    ],
    a: 1,
    exp: "Configure setting up a cloud solution environment according to Google Associate Cloud Engineer exam blueprint recommendations. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "When a manufacturing company modernizing IT implements Google Associate Cloud Engineer controls for Planning & Configuring a Cloud Solution, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for planning & configuring a cloud solution to improve performance",
      "Grant excessive privileges that violate planning & configuring a cloud solution least-privilege principles",
      "Select the planning & configuring a cloud solution option that meets Google Associate Cloud Engineer security and governance standards",
      "Rely solely on manual processes with no planning & configuring a cloud solution automation",
    ],
    a: 2,
    exp: "Select the planning & configuring a cloud solution option that meets Google Associate Cloud Engineer security and governance standards. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "A Google Associate Cloud Engineer practice exam scenario covers Deploying & Implementing Cloud Solutions for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate deploying & implementing cloud solutions least-privilege principles",
      "Rely solely on manual processes with no deploying & implementing cloud solutions automation",
      "Ignore deploying & implementing cloud solutions compliance requirements for faster deployment",
      "Design deploying & implementing cloud solutions using patterns validated in Google Associate Cloud Engineer practice assessments",
    ],
    a: 3,
    exp: "Design deploying & implementing cloud solutions using patterns validated in Google Associate Cloud Engineer practice assessments. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "Which Ensuring Successful Operation principle is emphasized in Google Associate Cloud Engineer when supporting a multinational enterprise?",
    opts: [
      "Apply the Google Associate Cloud Engineer-aligned ensuring successful operation approach recommended in official exam objectives",
      "Rely solely on manual processes with no ensuring successful operation automation",
      "Ignore ensuring successful operation compliance requirements for faster deployment",
      "Mix production and test ensuring successful operation configurations in one environment",
    ],
    a: 0,
    exp: "Apply the Google Associate Cloud Engineer-aligned ensuring successful operation approach recommended in official exam objectives. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "A regulated financial institution failed a mock Google Associate Cloud Engineer question on Configuring Access & Security. What concept should they review?",
    opts: [
      "Ignore configuring access & security compliance requirements for faster deployment",
      "Follow industry best practices for configuring access & security as defined in the Google Associate Cloud Engineer body of knowledge",
      "Mix production and test configuring access & security configurations in one environment",
      "Store sensitive configuring access & security credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for configuring access & security as defined in the Google Associate Cloud Engineer body of knowledge. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "For Google Associate Cloud Engineer certification, Setting up a Cloud Solution Environment knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test setting up a cloud solution environment configurations in one environment",
      "Store sensitive setting up a cloud solution environment credentials in plain text configuration files",
      "Implement the standard setting up a cloud solution environment solution that satisfies Google Associate Cloud Engineer domain requirements",
      "Skip setting up a cloud solution environment testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard setting up a cloud solution environment solution that satisfies Google Associate Cloud Engineer domain requirements. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "A team at a high-traffic e-commerce platform debates Planning & Configuring a Cloud Solution options while studying Google Associate Cloud Engineer. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive planning & configuring a cloud solution credentials in plain text configuration files",
      "Skip planning & configuring a cloud solution testing before production rollout",
      "Implement planning & configuring a cloud solution without change management or rollback plans",
      "Use the certified planning & configuring a cloud solution methodology specified for Google Associate Cloud Engineer candidates",
    ],
    a: 3,
    exp: "Use the certified planning & configuring a cloud solution methodology specified for Google Associate Cloud Engineer candidates. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "Which Deploying & Implementing Cloud Solutions capability is validated by Google Associate Cloud Engineer for organizations such as a government agency?",
    opts: [
      "Adopt the deploying & implementing cloud solutions control framework referenced in Google Associate Cloud Engineer study materials",
      "Skip deploying & implementing cloud solutions testing before production rollout",
      "Implement deploying & implementing cloud solutions without change management or rollback plans",
      "Use default deploying & implementing cloud solutions settings without hardening",
    ],
    a: 0,
    exp: "Adopt the deploying & implementing cloud solutions control framework referenced in Google Associate Cloud Engineer study materials. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "When evaluating Ensuring Successful Operation tools for Google Associate Cloud Engineer, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement ensuring successful operation without change management or rollback plans",
      "Configure ensuring successful operation according to Google Associate Cloud Engineer exam blueprint recommendations",
      "Use default ensuring successful operation settings without hardening",
      "Centralize all ensuring successful operation decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure ensuring successful operation according to Google Associate Cloud Engineer exam blueprint recommendations. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "A manufacturing company modernizing IT must document Configuring Access & Security procedures for Google Associate Cloud Engineer compliance. Which standard applies?",
    opts: [
      "Use default configuring access & security settings without hardening",
      "Centralize all configuring access & security decisions without stakeholder review",
      "Select the configuring access & security option that meets Google Associate Cloud Engineer security and governance standards",
      "Deprecate configuring access & security controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the configuring access & security option that meets Google Associate Cloud Engineer security and governance standards. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Setting up a Cloud Solution Environment ──
  {
    domain: "Setting up a Cloud Solution Environment",
    q: "A Google Associate Cloud Engineer instructor asks about Setting up a Cloud Solution Environment in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all setting up a cloud solution environment decisions without stakeholder review",
      "Deprecate setting up a cloud solution environment controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses setting up a cloud solution environment policies",
      "Design setting up a cloud solution environment using patterns validated in Google Associate Cloud Engineer practice assessments",
    ],
    a: 3,
    exp: "Design setting up a cloud solution environment using patterns validated in Google Associate Cloud Engineer practice assessments. This is the recommended approach for the Setting up a Cloud Solution Environment domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Planning & Configuring a Cloud Solution ──
  {
    domain: "Planning & Configuring a Cloud Solution",
    q: "Which Planning & Configuring a Cloud Solution metric best indicates Google Associate Cloud Engineer readiness for a multinational enterprise?",
    opts: [
      "Apply the Google Associate Cloud Engineer-aligned planning & configuring a cloud solution approach recommended in official exam objectives",
      "Deprecate planning & configuring a cloud solution controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses planning & configuring a cloud solution policies",
      "Disable monitoring for planning & configuring a cloud solution to improve performance",
    ],
    a: 0,
    exp: "Apply the Google Associate Cloud Engineer-aligned planning & configuring a cloud solution approach recommended in official exam objectives. This is the recommended approach for the Planning & Configuring a Cloud Solution domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Deploying & Implementing Cloud Solutions ──
  {
    domain: "Deploying & Implementing Cloud Solutions",
    q: "A regulated financial institution is troubleshooting a Deploying & Implementing Cloud Solutions issue while preparing for Google Associate Cloud Engineer. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses deploying & implementing cloud solutions policies",
      "Follow industry best practices for deploying & implementing cloud solutions as defined in the Google Associate Cloud Engineer body of knowledge",
      "Disable monitoring for deploying & implementing cloud solutions to improve performance",
      "Grant excessive privileges that violate deploying & implementing cloud solutions least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for deploying & implementing cloud solutions as defined in the Google Associate Cloud Engineer body of knowledge. This is the recommended approach for the Deploying & Implementing Cloud Solutions domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Ensuring Successful Operation ──
  {
    domain: "Ensuring Successful Operation",
    q: "In Google Associate Cloud Engineer, how should a healthcare organization handle a trade-off involving Ensuring Successful Operation?",
    opts: [
      "Disable monitoring for ensuring successful operation to improve performance",
      "Grant excessive privileges that violate ensuring successful operation least-privilege principles",
      "Implement the standard ensuring successful operation solution that satisfies Google Associate Cloud Engineer domain requirements",
      "Rely solely on manual processes with no ensuring successful operation automation",
    ],
    a: 2,
    exp: "Implement the standard ensuring successful operation solution that satisfies Google Associate Cloud Engineer domain requirements. This is the recommended approach for the Ensuring Successful Operation domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },

  // ── Configuring Access & Security ──
  {
    domain: "Configuring Access & Security",
    q: "Which Configuring Access & Security pattern is commonly tested on Google Associate Cloud Engineer for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate configuring access & security least-privilege principles",
      "Rely solely on manual processes with no configuring access & security automation",
      "Ignore configuring access & security compliance requirements for faster deployment",
      "Use the certified configuring access & security methodology specified for Google Associate Cloud Engineer candidates",
    ],
    a: 3,
    exp: "Use the certified configuring access & security methodology specified for Google Associate Cloud Engineer candidates. This is the recommended approach for the Configuring Access & Security domain on the Google Associate Cloud Engineer exam and reflects current certification objectives.",
  },
];
