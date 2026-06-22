import type { Question } from '../types';

export const BANK_SAP: Question[] = [

  // ── DOMAIN: Design for Organizational Complexity ──
  {
    domain: 'Design for Organizational Complexity',
    q: 'A large enterprise has 200 AWS accounts managed under AWS Organizations. The security team needs to prevent any account from creating IAM users with console access. Which is the MOST scalable approach?',
    opts: [
      'Deploy a Lambda function that monitors IAM user creation via CloudTrail and deletes console access',
      'Apply a Service Control Policy (SCP) to the root of the organization that denies iam:CreateLoginProfile',
      'Apply an IAM permission boundary to every IAM role in every account',
      'Use AWS Config remediation rules in every account',
    ],
    a: 1,
    exp: 'SCPs applied at the organization root apply to all accounts automatically. Denying iam:CreateLoginProfile via SCP prevents any principal in any member account from creating console passwords for IAM users, regardless of their own permissions.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'A company uses AWS Organizations with multiple OUs. Development accounts need full AWS access. Production accounts must restrict services to a pre-approved list. Audit accounts need read-only access everywhere. Which mechanism implements these differentiated policies centrally?',
    opts: [
      'IAM policies deployed by AWS CloudFormation StackSets to every account',
      'AWS Config rules with automatic remediation in each account',
      'Service Control Policies (SCPs) applied at the OU level',
      'AWS Control Tower guardrails deployed at the account level',
    ],
    a: 2,
    exp: 'SCPs at the OU level provide differentiated access policies. SCPs in the Dev OU can be permissive while Production OU SCPs restrict services to approved ones and Audit OU SCPs enforce read-only patterns — all managed centrally.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'An enterprise needs to share a centrally managed VPC with Transit Gateway across 50 AWS accounts in their organization without creating peering between each account. Which service enables this?',
    opts: [
      'VPC Peering between each account',
      'AWS Resource Access Manager (RAM) to share the Transit Gateway',
      'VPC Endpoints in each member account',
      'AWS Direct Connect with a hosted VIF for each account',
    ],
    a: 1,
    exp: 'AWS RAM allows sharing AWS resources like Transit Gateways, subnets, and Route 53 resolver rules with other accounts in the organization without resource duplication, enabling centralized networking through a shared TGW.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'A company needs to provide developers in a central tooling account with the ability to assume roles in target accounts to deploy infrastructure. Which pattern implements this cross-account access securely?',
    opts: [
      'Create IAM users in each target account and share credentials with the tooling account',
      'Create cross-account IAM roles in target accounts with a trust policy allowing the tooling account to assume them',
      'Use VPC peering to allow direct access between the tooling and target accounts',
      'Enable AWS Organizations trusted access for the tooling account',
    ],
    a: 1,
    exp: 'Cross-account IAM roles with trust policies specify which accounts can assume the role via STS. This eliminates static credentials and grants temporary, limited access scoped to what the role allows in the target account.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'A company uses AWS Control Tower to manage a multi-account environment. They want to enforce that all new accounts automatically have CloudTrail enabled and no root account activity is allowed. Which Control Tower feature implements these rules?',
    opts: [
      'Account Factory customizations',
      'Control Tower Guardrails (both preventive and detective)',
      'AWS Config rules deployed by Control Tower',
      'SCPs applied manually after account creation',
    ],
    a: 1,
    exp: 'Control Tower Guardrails are high-level rules: preventive guardrails use SCPs to block actions, and detective guardrails use Config rules to detect violations. They are automatically applied to enrolled accounts and OUs.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'An organization needs a centralized, dedicated account to aggregate AWS CloudTrail logs from all 100+ accounts in the organization for immutable storage and security analysis. Which approach is MOST appropriate?',
    opts: [
      'Configure CloudTrail in each account to write to local S3 buckets',
      'Create an organization-level CloudTrail trail that delivers events from all accounts to a central S3 bucket in a log archive account',
      'Use Amazon EventBridge with a rule that forwards CloudTrail events to a central account',
      'Deploy a Lambda function in each account to copy logs to the central account',
    ],
    a: 1,
    exp: 'An organization trail created in the management account automatically collects events from all member accounts and delivers them to a designated S3 bucket in a log archive account — centralized, immutable, and managed as a single trail.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'A company needs to provision new AWS accounts with standardized VPCs, security baselines, and tagging policies at scale without manual configuration for each account. Which service provides automated account vending?',
    opts: ['AWS CloudFormation StackSets', 'AWS Control Tower Account Factory', 'AWS Service Catalog', 'AWS Systems Manager Automation'],
    a: 1,
    exp: 'AWS Control Tower Account Factory automates account provisioning with pre-configured baselines including VPC settings, guardrails, SSO, and CloudTrail. New accounts are instantly compliant with organizational standards.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'A multinational company needs to ensure that data stored in European AWS accounts is never replicated outside the EU, and that non-EU accounts cannot access EU data. Which combination enforces this at scale?',
    opts: [
      'VPC NACLs blocking cross-region traffic',
      'AWS Organizations SCPs denying cross-region replication and restricting IAM access by aws:RequestedRegion condition',
      'Bucket policies on every S3 bucket with IP-based conditions',
      'Amazon Macie policies to block cross-region data movement',
    ],
    a: 1,
    exp: 'SCPs can use the aws:RequestedRegion condition key to restrict which Regions services can be used in. Combining SCPs to deny cross-region replication and limit allowed regions enforces data residency at the organizational level.',
  },

  // ── DOMAIN: Design for New Solutions ──
  {
    domain: 'Design for New Solutions',
    q: 'A company is migrating a monolithic application to AWS and wants to adopt microservices. Services need to communicate asynchronously, with the ability to replay events and scale independently. Which architecture is MOST appropriate?',
    opts: [
      'REST APIs with synchronous HTTP calls between services',
      'Amazon SQS queues between each pair of services',
      'Amazon EventBridge with event-driven microservices consuming from a central event bus',
      'AWS Step Functions orchestrating all microservice interactions',
    ],
    a: 2,
    exp: 'Amazon EventBridge provides a serverless event bus where services publish events and consumers subscribe based on rules. This fully decouples producers from consumers, supports fan-out, filtering, and replay — ideal for event-driven microservices.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'An application requires a workflow that orchestrates multiple Lambda functions, handles errors with retries and fallback logic, and has a visual audit trail of each execution. Which service best provides this?',
    opts: [
      'Amazon SQS with Lambda triggers',
      'AWS Step Functions',
      'Amazon EventBridge Pipes',
      'AWS Glue workflows',
    ],
    a: 1,
    exp: 'AWS Step Functions orchestrates distributed workflows visually, managing state, retries, error handling, and parallel execution across Lambda functions and other services. Execution history provides a complete audit trail.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company wants to build a hybrid architecture where on-premises applications can access AWS-hosted DynamoDB tables and S3 buckets using private IP addresses, without internet exposure. Which technology enables this?',
    opts: [
      'VPC Peering between on-premises and AWS',
      'AWS Direct Connect + AWS PrivateLink (VPC Interface Endpoints)',
      'AWS Site-to-Site VPN + public S3/DynamoDB endpoints',
      'AWS Transit Gateway with internet routing',
    ],
    a: 1,
    exp: 'AWS Direct Connect provides a private, dedicated connection. AWS PrivateLink creates Interface VPC Endpoints for services like DynamoDB and S3 (via interface endpoints), allowing on-premises access via private IPs over the Direct Connect path.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company needs a data lake architecture on AWS. Raw data from various sources must be catalogued, transformed, and made queryable via SQL. Which combination of services forms this pipeline?',
    opts: [
      'S3 + Amazon RDS + Amazon QuickSight',
      'S3 + AWS Glue (catalog + ETL) + Amazon Athena',
      'S3 + Amazon EMR + Amazon Redshift',
      'Amazon Kinesis Data Streams + Amazon DynamoDB + Amazon Redshift',
    ],
    a: 1,
    exp: 'S3 as the storage layer, AWS Glue for the data catalog (schema discovery) and ETL jobs, and Amazon Athena for serverless SQL queries directly on S3 is the standard AWS serverless data lake architecture.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A multi-tenant SaaS application must route API requests to different backend microservices based on URL path. SSL must be terminated at the load balancer layer. Which AWS component provides path-based routing with SSL termination?',
    opts: [
      'Network Load Balancer with TLS listeners',
      'Application Load Balancer with listener rules and path conditions',
      'Amazon API Gateway with stage variables',
      'AWS CloudFront with Lambda@Edge for routing',
    ],
    a: 1,
    exp: 'ALBs support path-based routing via listener rules (e.g., /api/users/* → user service, /api/orders/* → order service) and perform SSL/TLS termination, making them the standard layer-7 router for microservices.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company needs to build a highly available architecture that can tolerate an entire AZ failure. The application is stateless. Which configuration achieves this with minimal cost?',
    opts: [
      'Deploy EC2 instances in one AZ with EBS snapshots for backup',
      'Deploy EC2 instances across at least 2 AZs behind an ALB with an Auto Scaling Group',
      'Deploy instances in a single AZ with Multi-AZ RDS',
      'Use AWS Lambda in one AZ with a read replica for failover',
    ],
    a: 1,
    exp: 'Deploying instances across multiple AZs with an ALB distributes traffic and ensures that if one AZ fails, the ALB automatically routes traffic to healthy instances in remaining AZs. Auto Scaling ensures enough capacity.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A financial services company needs a managed message broker that supports JMS, AMQP, and MQTT protocols for migrating existing on-premises messaging workloads. Which AWS service should be used?',
    opts: ['Amazon SQS', 'Amazon SNS', 'Amazon MQ', 'Amazon Kinesis Data Streams'],
    a: 2,
    exp: 'Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ that supports industry-standard protocols including JMS, NMS, AMQP, STOMP, MQTT, and WebSocket — ideal for lift-and-shift migrations from on-premises brokers.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company needs to perform complex graph traversals on social network data, finding relationships like "friends of friends" with low latency. Which AWS database service is MOST suitable?',
    opts: ['Amazon DynamoDB', 'Amazon RDS PostgreSQL', 'Amazon Neptune', 'Amazon Keyspaces'],
    a: 2,
    exp: 'Amazon Neptune is a fully managed graph database service supporting property graph (Gremlin) and RDF (SPARQL) query languages. It is purpose-built for connected data use cases like social networks, fraud detection, and knowledge graphs.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A real-time fraud detection system must process payment events in under 10 milliseconds. The system uses ML models that need to be invoked per transaction. Which architecture achieves this?',
    opts: [
      'Batch process transactions hourly with AWS Batch and SageMaker',
      'Use Amazon Kinesis Data Streams → Lambda → Amazon SageMaker real-time inference endpoint',
      'Store events in S3 and run Athena queries every minute',
      'Write events to DynamoDB and trigger daily SageMaker training jobs',
    ],
    a: 1,
    exp: 'Kinesis Data Streams captures events in real time, Lambda processes each event and invokes a SageMaker real-time endpoint synchronously for ML inference. This architecture achieves sub-10ms end-to-end latency for transaction scoring.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company needs to run containerized microservices without managing underlying EC2 instances, with automatic scaling and fine-grained task-level IAM permissions. Which compute platform is MOST appropriate?',
    opts: [
      'Amazon ECS on EC2 with an Auto Scaling Group',
      'Amazon EKS on EC2 with managed node groups',
      'AWS Fargate with Amazon ECS or EKS',
      'AWS Lambda with container image support',
    ],
    a: 2,
    exp: 'AWS Fargate is a serverless compute engine for containers (ECS/EKS) that eliminates EC2 management. Each task has its own IAM task role for fine-grained permissions, and Fargate scales by launching new tasks without node provisioning.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company is designing a multi-Region active-active architecture. Users in the US should write to the US Region and users in Europe should write to the EU Region, but data must be globally replicated with conflict resolution. Which DynamoDB feature enables this?',
    opts: [
      'DynamoDB Streams with a Lambda replication function',
      'DynamoDB Global Tables',
      'DynamoDB Cross-Region backups',
      'DynamoDB Accelerator (DAX) in each Region',
    ],
    a: 1,
    exp: 'DynamoDB Global Tables provide multi-Region, multi-active replication with built-in conflict resolution (last-writer-wins). Any Region can handle reads and writes, with changes automatically propagated to all replicas.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company wants to add full-text search capabilities to their application with features like fuzzy matching, filtering, and ranking, without managing search infrastructure. Which AWS service provides this?',
    opts: ['Amazon RDS with full-text index', 'Amazon DynamoDB with PartiQL', 'Amazon OpenSearch Service', 'Amazon Kendra'],
    a: 2,
    exp: 'Amazon OpenSearch Service (formerly Elasticsearch) is a managed service for full-text search, log analytics, and observability. It supports fuzzy matching, aggregations, and complex queries with no infrastructure management.',
  },

  // ── DOMAIN: Migration Planning ──
  {
    domain: 'Migration Planning',
    q: 'A company is migrating a 50 TB Oracle database to Amazon Aurora PostgreSQL. They want to convert the schema and migrate data with minimal downtime. Which combination of services provides this capability?',
    opts: [
      'AWS DataSync for schema conversion and DMS for data migration',
      'AWS Schema Conversion Tool (SCT) for schema conversion and AWS DMS for data migration',
      'AWS Snowball for offline data transfer and manual schema conversion',
      'AWS Database Migration Service alone handles both schema conversion and data migration',
    ],
    a: 1,
    exp: 'AWS SCT converts the source database schema and stored procedures to the target dialect. AWS DMS then migrates data with continuous replication (CDC) to keep the target in sync until cutover, minimizing downtime.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company needs to migrate 2 PB of on-premises data to S3. Their internet connection is 1 Gbps and the data transfer must complete within 2 weeks. What is the MOST cost-effective migration approach?',
    opts: [
      'AWS DataSync over the internet',
      'AWS Snowball Edge Storage Optimized devices',
      'AWS Direct Connect with 10 Gbps link',
      'S3 Transfer Acceleration with multipart upload',
    ],
    a: 1,
    exp: 'At 1 Gbps, transferring 2 PB over the internet would take over 180 days. Multiple AWS Snowball Edge devices (80 TB per device) can transfer the data physically within the 2-week window at lower cost than provisioning high-speed circuits.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company wants to migrate workloads to AWS following the 6 Rs strategy. An application that cannot be modified and uses a commercial license needs to run unchanged on AWS. Which migration strategy applies?',
    opts: ['Re-architect (Re-build)', 'Re-platform (Lift-Tinker-Shift)', 'Re-host (Lift-and-Shift)', 'Retire'],
    a: 2,
    exp: 'Re-host (lift-and-shift) moves the application as-is to AWS without code changes, typically using VM import or Server Migration Service. It is appropriate for applications that cannot be modified or refactored quickly.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company needs to continuously replicate on-premises server data to AWS for disaster recovery with near-zero RPO and the ability to failover and failback quickly. Which service provides this capability?',
    opts: [
      'AWS DataSync with scheduled hourly sync',
      'AWS Application Migration Service (MGN) with continuous replication',
      'AWS Backup with hourly backup jobs',
      'AWS Snowball Edge with weekly data transfer',
    ],
    a: 1,
    exp: 'AWS Application Migration Service (MGN) performs continuous block-level replication of on-premises servers to a staging area in AWS, achieving near-zero RPO. Failover launches fully functional EC2 instances from the replicated data.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company migrating to AWS has a large fleet of VMs to assess. They need to collect inventory data, installed applications, and network connections from all servers automatically. Which service performs this discovery?',
    opts: ['AWS Application Discovery Service', 'AWS Migration Hub', 'AWS Systems Manager Inventory', 'AWS Config discovery mode'],
    a: 0,
    exp: 'AWS Application Discovery Service collects configuration, usage, and network connection data from on-premises servers using an agentless collector (VMware vCenter) or agent-based approach, feeding data into AWS Migration Hub.',
  },
  {
    domain: 'Migration Planning',
    q: 'During a database migration using AWS DMS, the company needs to keep the target database synchronized with the source during the cutover window. Which DMS feature enables ongoing replication after the initial load?',
    opts: [
      'Full load replication',
      'Change Data Capture (CDC)',
      'AWS SCT data extraction agents',
      'DMS data validation task',
    ],
    a: 1,
    exp: 'DMS Change Data Capture (CDC) reads the database transaction log to capture and apply ongoing changes from the source to the target after the initial full-load migration, keeping them in sync until cutover.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company is migrating files from an NFS server to Amazon EFS. They need to transfer 10 TB of data over Direct Connect with bandwidth throttling to avoid impacting production traffic. Which service provides this?',
    opts: ['AWS Snowball Edge', 'AWS DataSync', 'AWS Transfer Family', 'S3 Sync via CLI'],
    a: 1,
    exp: 'AWS DataSync is designed for online data migrations from NFS, SMB, and S3 sources. It transfers data over Direct Connect or the internet, supports bandwidth throttling, and can sync to Amazon EFS, S3, and FSx.',
  },

  // ── DOMAIN: Cost Control ──
  {
    domain: 'Cost Control',
    q: 'A company has multiple teams using different AWS accounts under AWS Organizations. Finance needs to allocate costs by team and project. Which feature enables cost attribution?',
    opts: [
      'AWS Cost Explorer with daily granularity',
      'AWS Cost Allocation Tags activated in the management account',
      'AWS Budgets with per-account alerts',
      'AWS Trusted Advisor cost optimization checks',
    ],
    a: 1,
    exp: 'Cost allocation tags allow resources to be tagged with business metadata (team, project, environment). When activated in the management account, they appear as columns in the Cost and Usage Report, enabling granular cost attribution.',
  },
  {
    domain: 'Cost Control',
    q: 'A company runs a large fleet of EC2 Spot Instances for batch processing. They want to handle Spot interruptions gracefully to avoid wasted work. Which approach minimizes the impact of interruptions?',
    opts: [
      'Use On-Demand instances as a backup fleet in the Auto Scaling Group',
      'Use a Spot Fleet with diversification across multiple instance types and AZs, with checkpoint logic in the application',
      'Set a very high Spot bid price to reduce interruption probability',
      'Use Reserved Instances instead of Spot for the batch workload',
    ],
    a: 1,
    exp: 'A diversified Spot Fleet across multiple instance types and AZs reduces interruption probability. Application-level checkpointing allows the work to resume from the last checkpoint after an interruption, minimizing wasted computation.',
  },
  {
    domain: 'Cost Control',
    q: 'A company\'s analytics team keeps EC2 instances running 24/7 that are only used for 4 hours per day. How should AWS Compute Optimizer recommendations be acted upon to reduce costs?',
    opts: [
      'Upgrade to larger instance types based on the recommendations',
      'Right-size the instances and schedule stop/start based on usage patterns',
      'Convert all instances to Reserved Instances',
      'Move all analytics workloads to Spot Instances',
    ],
    a: 1,
    exp: 'Right-sizing reduces per-hour cost, and scheduling stop/start during unused hours (20 hours/day) reduces running hours by 83%. Together these provide substantial savings. Compute Optimizer identifies right-sizing opportunities from utilization data.',
  },
  {
    domain: 'Cost Control',
    q: 'A company transfers large amounts of data from EC2 instances to S3 within the same Region and between Regions. Which statement about AWS data transfer pricing is correct?',
    opts: [
      'All data transfer within AWS is free',
      'Data transfer from EC2 to S3 in the same Region is free; cross-Region transfer incurs charges',
      'Data transfer between AZs in the same Region is always free',
      'Data transfer out to the internet from S3 is free',
    ],
    a: 1,
    exp: 'Data transfer between EC2 and S3 within the same Region is free. Cross-Region data transfer incurs charges per GB. Data transfer between AZs incurs per-GB charges. Data transfer out to the internet incurs per-GB charges.',
  },
  {
    domain: 'Cost Control',
    q: 'A company wants to automatically receive recommendations to purchase Savings Plans or Reserved Instances based on their historical usage. Which service provides these purchase recommendations?',
    opts: ['AWS Trusted Advisor', 'AWS Cost Explorer with Savings Plans and RI recommendations', 'AWS Compute Optimizer', 'AWS Budgets anomaly detection'],
    a: 1,
    exp: 'AWS Cost Explorer analyzes your usage history and provides Savings Plans and Reserved Instance purchase recommendations, including estimated savings, recommended term, and payment option to help optimize committed usage.',
  },

  // ── DOMAIN: Continuous Improvement ──
  {
    domain: 'Continuous Improvement',
    q: 'A company wants to automatically detect configuration changes that make their AWS resources non-compliant (e.g., S3 buckets without encryption, security groups with port 22 open to the internet) and remediate them automatically. Which service provides this?',
    opts: [
      'Amazon GuardDuty with automatic response actions',
      'AWS Config with managed rules and automatic SSM remediation',
      'AWS CloudTrail with Lambda event-driven remediation',
      'AWS Security Hub with automated playbooks',
    ],
    a: 1,
    exp: 'AWS Config evaluates resources against managed or custom rules on change or periodically. Non-compliant resources can trigger automatic remediation using SSM Automation documents, providing continuous compliance enforcement.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company runs a production application and wants to perform automated canary releases where 5% of traffic goes to the new version initially, increasing to 100% only if error rates stay below 1%. Which service orchestrates this?',
    opts: [
      'AWS CodeDeploy with a canary deployment configuration',
      'Application Load Balancer with weighted target groups',
      'AWS CloudFormation rolling updates',
      'Amazon Route 53 weighted routing',
    ],
    a: 0,
    exp: 'AWS CodeDeploy canary deployment configuration deploys to a small percentage of instances first, monitors CloudWatch alarms, and either proceeds with a full rollout or performs automatic rollback if metrics exceed thresholds.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company wants to define and enforce infrastructure standards across hundreds of AWS accounts using code templates that are pre-approved and can be self-serviced by development teams. Which service enables this?',
    opts: [
      'AWS CloudFormation StackSets',
      'AWS Service Catalog',
      'AWS Control Tower customizations',
      'AWS Systems Manager Automation',
    ],
    a: 1,
    exp: 'AWS Service Catalog allows IT to create portfolios of approved CloudFormation templates. Development teams can self-service deploy only from these approved products, ensuring standards are met while enabling team autonomy.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company wants to analyze operational health of their application and correlate metrics, logs, and traces in one place to quickly identify the root cause of performance issues. Which AWS service provides this unified observability?',
    opts: ['Amazon CloudWatch with Container Insights', 'AWS X-Ray', 'Amazon CloudWatch Application Signals / CloudWatch Unified Observability', 'AWS Systems Manager OpsCenter'],
    a: 2,
    exp: 'Amazon CloudWatch provides unified observability combining metrics, logs, and distributed traces. CloudWatch Application Signals and X-Ray tracing allow correlation of application performance data for root cause analysis across distributed systems.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company has a fully automated CI/CD pipeline. They want to ensure that infrastructure-as-code templates are validated for security issues and compliance violations BEFORE deployment. Which approach integrates this shift-left security?',
    opts: [
      'Run AWS Config rules after deployment to catch violations',
      'Integrate CloudFormation Guard or cfn-nag into the CodePipeline build stage',
      'Enable AWS Security Hub in the target account',
      'Use AWS Trusted Advisor checks in the production account',
    ],
    a: 1,
    exp: 'Tools like CloudFormation Guard (cfn-guard) and cfn-nag perform static analysis on CloudFormation templates at build time to detect security misconfigurations before deployment — shift-left approach to IaC security.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company uses AWS Systems Manager to manage a large fleet of EC2 instances. They need to apply the latest OS patches across all instances in a maintenance window without manual effort. Which SSM feature enables this?',
    opts: ['SSM Run Command', 'SSM Patch Manager with a Patch Baseline and Maintenance Window', 'SSM State Manager', 'SSM Session Manager'],
    a: 1,
    exp: 'SSM Patch Manager automates patch application using Patch Baselines that define which patches to approve. Maintenance Windows schedule patching tasks across instance fleets during defined low-traffic windows.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company wants to perform chaos engineering to improve application resilience by injecting failures (CPU stress, network latency, instance termination) into their production environment in a controlled manner. Which AWS service enables this?',
    opts: ['AWS Fault Injection Service (FIS)', 'AWS Systems Manager Run Command', 'Amazon CloudWatch Synthetics', 'AWS Resilience Hub'],
    a: 0,
    exp: 'AWS Fault Injection Service (FIS) is a managed chaos engineering service that enables controlled fault injection experiments (EC2 API actions, CPU/memory stress, network disruptions) to test and improve application resilience.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company runs a Well-Architected review and discovers that their disaster recovery strategy has an undocumented RTO of approximately 8 hours. They want to improve it to under 1 hour. Which DR strategy achieves this?',
    opts: [
      'Backup and restore — back up data to S3 and restore from AMIs',
      'Pilot Light — maintain a minimal running environment in the DR region with database replication',
      'Warm Standby — run a scaled-down but fully functional copy in the DR region',
      'Multi-Site Active-Active — run full production capacity in both regions simultaneously',
    ],
    a: 2,
    exp: 'Warm Standby maintains a scaled-down but fully functional environment in the DR region with database replication. Failover involves scaling up the existing running resources, achieving RTO under 1 hour. Multi-Site achieves near-zero RTO but at higher cost.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'An operations team receives hundreds of CloudWatch alarm notifications daily, making it difficult to identify critical issues. They want to implement AIOps to automatically group related alerts and reduce noise. Which AWS feature helps?',
    opts: [
      'CloudWatch Composite Alarms',
      'Amazon DevOps Guru',
      'AWS Systems Manager OpsCenter',
      'AWS Config aggregator',
    ],
    a: 1,
    exp: 'Amazon DevOps Guru uses ML to analyze operational data and automatically identify anomalies, correlate related events, and surface actionable insights, reducing alert noise and accelerating root cause identification.',
  },

  // ── Additional cross-domain Professional questions ──
  {
    domain: 'Design for New Solutions',
    q: 'A company needs to build a serverless API that handles millions of requests per day. The API must throttle requests per customer and enforce usage quotas. Which service provides built-in throttling, quotas, and API key management?',
    opts: [
      'AWS Lambda with a custom rate-limiting algorithm',
      'Amazon API Gateway with usage plans and API keys',
      'Application Load Balancer with target group weights',
      'Amazon CloudFront with signed URLs',
    ],
    a: 1,
    exp: 'Amazon API Gateway usage plans define throttling limits and quotas per API key. API keys identify customers and are associated with usage plans, enabling per-customer rate limiting and quota enforcement natively.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'A company uses AWS Organizations and wants to share Amazon VPC subnets across all accounts in a specific OU so that workloads in different accounts use the same centralized networking. Which feature enables this?',
    opts: [
      'VPC Peering between all accounts',
      'AWS Transit Gateway with inter-account attachments',
      'AWS Resource Access Manager (RAM) sharing VPC subnets',
      'AWS PrivateLink endpoints in each account',
    ],
    a: 2,
    exp: 'AWS RAM can share VPC subnets with member accounts within an organization. Workloads in different accounts can launch resources directly into the shared subnets, centralizing networking without per-account VPC management.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company has 500 on-premises Windows servers to migrate to EC2. They want to automate the migration of all servers in parallel while maintaining the original configurations. Which service provides automated lift-and-shift migration at scale?',
    opts: [
      'AWS Snowball Edge for offline transfer',
      'AWS Application Migration Service (AWS MGN)',
      'AWS VM Import/Export',
      'AWS DataSync with EC2 bootstrap scripts',
    ],
    a: 1,
    exp: 'AWS Application Migration Service (MGN) installs an agent on source servers that continuously replicates them to AWS. At cutover, MGN launches EC2 instances from the replicated servers, supporting hundreds of servers in parallel.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company wants to decouple their order processing system. When an order is placed, an event must trigger multiple independent processes: inventory reservation, payment processing, and notification. Which pattern achieves this with minimal coupling?',
    opts: [
      'SQS FIFO queue with a single consumer',
      'Direct Lambda invocation chain',
      'SNS topic with multiple SQS queue subscriptions (fan-out)',
      'Step Functions Express Workflow',
    ],
    a: 2,
    exp: 'SNS fan-out sends a single order event to multiple SQS queues simultaneously. Each queue has an independent consumer (inventory, payment, notification service), fully decoupling the services and enabling independent scaling and failure handling.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company runs a microservices architecture on AWS. They want to automatically discover all services, track dependencies, and identify which service calls are causing performance bottlenecks. Which AWS service provides distributed tracing?',
    opts: ['Amazon CloudWatch Metrics', 'AWS CloudTrail', 'AWS X-Ray', 'Amazon VPC Flow Logs'],
    a: 2,
    exp: 'AWS X-Ray provides distributed tracing by instrumenting applications to capture request traces across services. It visualizes service maps showing dependencies, and identifies latency bottlenecks and error rates in each service segment.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company needs to build a media transcoding pipeline that processes video uploads. Processing a single video can take 30–60 minutes. The pipeline must scale to handle hundreds of concurrent transcoding jobs. Which architecture is MOST appropriate?',
    opts: [
      'Lambda functions triggered by S3 events',
      'S3 upload triggers an SNS notification, which queues jobs in SQS, processed by Auto Scaling EC2 workers or ECS tasks',
      'API Gateway + Lambda for all transcoding logic',
      'EC2 instances with a cron job polling an S3 bucket',
    ],
    a: 1,
    exp: 'S3 → SNS → SQS decouples the upload from processing. Auto Scaling EC2 workers or ECS tasks drain the SQS queue, with scaling based on queue depth. Lambda has a 15-minute timeout so it cannot handle 30–60 minute jobs.',
  },
  {
    domain: 'Cost Control',
    q: 'A company runs production workloads on EC2 using Reserved Instances. They want to reduce the financial risk of over-purchasing capacity commitments. Which RI feature provides flexibility to change instance attributes after purchase?',
    opts: [
      'Convertible Reserved Instances',
      'Standard Reserved Instances with AZ scope',
      'Savings Plans with EC2 instance family flexibility',
      'Reserved Instances with partial upfront payment',
    ],
    a: 0,
    exp: 'Convertible Reserved Instances allow you to exchange the RI for a different instance family, OS, or tenancy. While they offer slightly less discount than Standard RIs, they provide flexibility to adapt to changing workload requirements.',
  },
  {
    domain: 'Design for Organizational Complexity',
    q: 'An enterprise needs to connect 30 VPCs across 3 AWS Regions and their on-premises data center through a single managed hub. Which architecture minimizes the number of connections required?',
    opts: [
      'VPC peering mesh between all 30 VPCs and Direct Connect in each Region',
      'AWS Transit Gateway in each Region with TGW peering across Regions and Direct Connect attachment in one Region',
      'AWS PrivateLink endpoints in each VPC for cross-VPC communication',
      'AWS Site-to-Site VPN connections between each VPC pair',
    ],
    a: 1,
    exp: 'Transit Gateway acts as a hub, replacing n*(n-1)/2 VPC peering connections with n connections. TGW peering between Regional TGWs extends this globally. A Direct Connect attachment to the TGW provides on-premises connectivity through a single connection.',
  },
  {
    domain: 'Design for New Solutions',
    q: 'A company needs to build a global API that routes users to the nearest Region, provides fast failover, and improves performance by leveraging the AWS global backbone network instead of the public internet. Which service achieves this?',
    opts: [
      'Amazon CloudFront with regional edge caches',
      'AWS Global Accelerator with endpoint groups in multiple Regions',
      'Route 53 latency-based routing with health checks',
      'Application Load Balancers in each Region with Route 53 geolocation',
    ],
    a: 1,
    exp: 'AWS Global Accelerator uses AWS edge locations as ingress points and routes traffic over the AWS global backbone to the optimal regional endpoint. It provides static Anycast IP addresses, near-instant failover, and significantly lower latency than internet routing.',
  },
  {
    domain: 'Continuous Improvement',
    q: 'A company wants to evaluate their AWS architecture against the five pillars of the Well-Architected Framework to identify high-risk issues before go-live. Which AWS tool provides this structured review?',
    opts: [
      'AWS Trusted Advisor',
      'AWS Well-Architected Tool',
      'AWS Security Hub',
      'AWS Compute Optimizer',
    ],
    a: 1,
    exp: 'The AWS Well-Architected Tool provides a structured questionnaire based on the six pillars (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability). It identifies high-risk issues and improvement plan items.',
  },
  {
    domain: 'Migration Planning',
    q: 'A company wants to migrate their on-premises Microsoft SQL Server databases to Amazon RDS. They need to ensure compatibility and identify features that are not supported on RDS before migration. Which tool performs this assessment?',
    opts: [
      'AWS Database Migration Service with pre-migration assessment',
      'AWS Schema Conversion Tool (SCT) with multi-server assessment',
      'AWS Application Discovery Service',
      'AWS Migration Hub strategy recommendations',
    ],
    a: 1,
    exp: 'AWS SCT can analyze multiple source databases and generate a database migration assessment report identifying features that require manual conversion or are not supported in the target — essential for planning before committing to migration.',
  },


  // ── Additional SAP-C02 practice questions (98 added) ──

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity capability is validated by AWS Certified Solutions Architect – Professional for organizations such as a government agency?",
    opts: [
      "Adopt the design for organizational complexity control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Rely solely on manual processes with no design for organizational complexity automation",
      "Ignore design for organizational complexity compliance requirements for faster deployment",
      "Mix production and test design for organizational complexity configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the design for organizational complexity control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "When evaluating Design for New Solutions tools for AWS Certified Solutions Architect – Professional, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Ignore design for new solutions compliance requirements for faster deployment",
      "Configure design for new solutions according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Mix production and test design for new solutions configurations in one environment",
      "Store sensitive design for new solutions credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure design for new solutions according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A manufacturing company modernizing IT must document Migration Planning procedures for AWS Certified Solutions Architect – Professional compliance. Which standard applies?",
    opts: [
      "Mix production and test migration planning configurations in one environment",
      "Store sensitive migration planning credentials in plain text configuration files",
      "Select the migration planning option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Skip migration planning testing before production rollout",
    ],
    a: 2,
    exp: "Select the migration planning option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A AWS Certified Solutions Architect – Professional instructor asks about Cost Control in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Store sensitive cost control credentials in plain text configuration files",
      "Skip cost control testing before production rollout",
      "Implement cost control without change management or rollback plans",
      "Design cost control using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design cost control using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "Which Continuous Improvement metric best indicates AWS Certified Solutions Architect – Professional readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned continuous improvement approach recommended in official exam objectives",
      "Skip continuous improvement testing before production rollout",
      "Implement continuous improvement without change management or rollback plans",
      "Use default continuous improvement settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned continuous improvement approach recommended in official exam objectives. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A regulated financial institution is troubleshooting a Design for Organizational Complexity issue while preparing for AWS Certified Solutions Architect – Professional. What is the first step?",
    opts: [
      "Implement design for organizational complexity without change management or rollback plans",
      "Follow industry best practices for design for organizational complexity as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Use default design for organizational complexity settings without hardening",
      "Centralize all design for organizational complexity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for design for organizational complexity as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "In AWS Certified Solutions Architect – Professional, how should a healthcare organization handle a trade-off involving Design for New Solutions?",
    opts: [
      "Use default design for new solutions settings without hardening",
      "Centralize all design for new solutions decisions without stakeholder review",
      "Implement the standard design for new solutions solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Deprecate design for new solutions controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard design for new solutions solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "Which Migration Planning pattern is commonly tested on AWS Certified Solutions Architect – Professional for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Centralize all migration planning decisions without stakeholder review",
      "Deprecate migration planning controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses migration planning policies",
      "Use the certified migration planning methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified migration planning methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A government agency is preparing for AWS Certified Solutions Architect – Professional and must strengthen Cost Control. Which option is BEST?",
    opts: [
      "Adopt the cost control control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Deprecate cost control controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses cost control policies",
      "Disable monitoring for cost control to improve performance",
    ],
    a: 0,
    exp: "Adopt the cost control control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "During a AWS Certified Solutions Architect – Professional readiness review at a SaaS startup scaling rapidly, which Continuous Improvement approach meets certification objectives?",
    opts: [
      "Use an undocumented workaround that bypasses continuous improvement policies",
      "Configure continuous improvement according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Disable monitoring for continuous improvement to improve performance",
      "Grant excessive privileges that violate continuous improvement least-privilege principles",
    ],
    a: 1,
    exp: "Configure continuous improvement according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified Solutions Architect – Professional recommends improvements to Design for Organizational Complexity. What should they implement?",
    opts: [
      "Disable monitoring for design for organizational complexity to improve performance",
      "Grant excessive privileges that violate design for organizational complexity least-privilege principles",
      "Select the design for organizational complexity option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Rely solely on manual processes with no design for organizational complexity automation",
    ],
    a: 2,
    exp: "Select the design for organizational complexity option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "Which Design for New Solutions strategy is MOST appropriate when a media company with global users adopts AWS Certified Solutions Architect – Professional standards?",
    opts: [
      "Grant excessive privileges that violate design for new solutions least-privilege principles",
      "Rely solely on manual processes with no design for new solutions automation",
      "Ignore design for new solutions compliance requirements for faster deployment",
      "Design design for new solutions using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design design for new solutions using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "An audit of a multinational enterprise reveals gaps in Migration Planning for AWS Certified Solutions Architect – Professional. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned migration planning approach recommended in official exam objectives",
      "Rely solely on manual processes with no migration planning automation",
      "Ignore migration planning compliance requirements for faster deployment",
      "Mix production and test migration planning configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned migration planning approach recommended in official exam objectives. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A regulated financial institution is designing a AWS Certified Solutions Architect – Professional study plan focused on Cost Control. Which resource topic is essential?",
    opts: [
      "Ignore cost control compliance requirements for faster deployment",
      "Follow industry best practices for cost control as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Mix production and test cost control configurations in one environment",
      "Store sensitive cost control credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for cost control as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "When a healthcare organization implements AWS Certified Solutions Architect – Professional controls for Continuous Improvement, which practice reduces operational risk?",
    opts: [
      "Mix production and test continuous improvement configurations in one environment",
      "Store sensitive continuous improvement credentials in plain text configuration files",
      "Implement the standard continuous improvement solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Skip continuous improvement testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard continuous improvement solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A AWS Certified Solutions Architect – Professional practice exam scenario covers Design for Organizational Complexity for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive design for organizational complexity credentials in plain text configuration files",
      "Skip design for organizational complexity testing before production rollout",
      "Implement design for organizational complexity without change management or rollback plans",
      "Use the certified design for organizational complexity methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified design for organizational complexity methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "Which Design for New Solutions principle is emphasized in AWS Certified Solutions Architect – Professional when supporting a government agency?",
    opts: [
      "Adopt the design for new solutions control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Skip design for new solutions testing before production rollout",
      "Implement design for new solutions without change management or rollback plans",
      "Use default design for new solutions settings without hardening",
    ],
    a: 0,
    exp: "Adopt the design for new solutions control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified Solutions Architect – Professional question on Migration Planning. What concept should they review?",
    opts: [
      "Implement migration planning without change management or rollback plans",
      "Configure migration planning according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Use default migration planning settings without hardening",
      "Centralize all migration planning decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure migration planning according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "For AWS Certified Solutions Architect – Professional certification, Cost Control knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Use default cost control settings without hardening",
      "Centralize all cost control decisions without stakeholder review",
      "Select the cost control option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Deprecate cost control controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the cost control option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A team at a media company with global users debates Continuous Improvement options while studying AWS Certified Solutions Architect – Professional. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all continuous improvement decisions without stakeholder review",
      "Deprecate continuous improvement controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses continuous improvement policies",
      "Design continuous improvement using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design continuous improvement using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity capability is validated by AWS Certified Solutions Architect – Professional for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned design for organizational complexity approach recommended in official exam objectives",
      "Deprecate design for organizational complexity controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses design for organizational complexity policies",
      "Disable monitoring for design for organizational complexity to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned design for organizational complexity approach recommended in official exam objectives. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "When evaluating Design for New Solutions tools for AWS Certified Solutions Architect – Professional, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Use an undocumented workaround that bypasses design for new solutions policies",
      "Follow industry best practices for design for new solutions as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Disable monitoring for design for new solutions to improve performance",
      "Grant excessive privileges that violate design for new solutions least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for design for new solutions as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A healthcare organization must document Migration Planning procedures for AWS Certified Solutions Architect – Professional compliance. Which standard applies?",
    opts: [
      "Disable monitoring for migration planning to improve performance",
      "Grant excessive privileges that violate migration planning least-privilege principles",
      "Implement the standard migration planning solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Rely solely on manual processes with no migration planning automation",
    ],
    a: 2,
    exp: "Implement the standard migration planning solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A AWS Certified Solutions Architect – Professional instructor asks about Cost Control in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate cost control least-privilege principles",
      "Rely solely on manual processes with no cost control automation",
      "Ignore cost control compliance requirements for faster deployment",
      "Use the certified cost control methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified cost control methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "Which Continuous Improvement metric best indicates AWS Certified Solutions Architect – Professional readiness for a government agency?",
    opts: [
      "Adopt the continuous improvement control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Rely solely on manual processes with no continuous improvement automation",
      "Ignore continuous improvement compliance requirements for faster deployment",
      "Mix production and test continuous improvement configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the continuous improvement control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A SaaS startup scaling rapidly is troubleshooting a Design for Organizational Complexity issue while preparing for AWS Certified Solutions Architect – Professional. What is the first step?",
    opts: [
      "Ignore design for organizational complexity compliance requirements for faster deployment",
      "Configure design for organizational complexity according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Mix production and test design for organizational complexity configurations in one environment",
      "Store sensitive design for organizational complexity credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure design for organizational complexity according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "In AWS Certified Solutions Architect – Professional, how should a manufacturing company modernizing IT handle a trade-off involving Design for New Solutions?",
    opts: [
      "Mix production and test design for new solutions configurations in one environment",
      "Store sensitive design for new solutions credentials in plain text configuration files",
      "Select the design for new solutions option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Skip design for new solutions testing before production rollout",
    ],
    a: 2,
    exp: "Select the design for new solutions option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "Which Migration Planning pattern is commonly tested on AWS Certified Solutions Architect – Professional for scenarios involving a media company with global users?",
    opts: [
      "Store sensitive migration planning credentials in plain text configuration files",
      "Skip migration planning testing before production rollout",
      "Implement migration planning without change management or rollback plans",
      "Design migration planning using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design migration planning using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A multinational enterprise is preparing for AWS Certified Solutions Architect – Professional and must strengthen Cost Control. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned cost control approach recommended in official exam objectives",
      "Skip cost control testing before production rollout",
      "Implement cost control without change management or rollback plans",
      "Use default cost control settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned cost control approach recommended in official exam objectives. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "During a AWS Certified Solutions Architect – Professional readiness review at a regulated financial institution, which Continuous Improvement approach meets certification objectives?",
    opts: [
      "Implement continuous improvement without change management or rollback plans",
      "Follow industry best practices for continuous improvement as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Use default continuous improvement settings without hardening",
      "Centralize all continuous improvement decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for continuous improvement as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A consultant advising a healthcare organization on AWS Certified Solutions Architect – Professional recommends improvements to Design for Organizational Complexity. What should they implement?",
    opts: [
      "Use default design for organizational complexity settings without hardening",
      "Centralize all design for organizational complexity decisions without stakeholder review",
      "Implement the standard design for organizational complexity solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Deprecate design for organizational complexity controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard design for organizational complexity solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "Which Design for New Solutions strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Solutions Architect – Professional standards?",
    opts: [
      "Centralize all design for new solutions decisions without stakeholder review",
      "Deprecate design for new solutions controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses design for new solutions policies",
      "Use the certified design for new solutions methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified design for new solutions methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "An audit of a government agency reveals gaps in Migration Planning for AWS Certified Solutions Architect – Professional. Which remediation is CORRECT?",
    opts: [
      "Adopt the migration planning control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Deprecate migration planning controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses migration planning policies",
      "Disable monitoring for migration planning to improve performance",
    ],
    a: 0,
    exp: "Adopt the migration planning control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Solutions Architect – Professional study plan focused on Cost Control. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses cost control policies",
      "Configure cost control according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Disable monitoring for cost control to improve performance",
      "Grant excessive privileges that violate cost control least-privilege principles",
    ],
    a: 1,
    exp: "Configure cost control according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "When a manufacturing company modernizing IT implements AWS Certified Solutions Architect – Professional controls for Continuous Improvement, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for continuous improvement to improve performance",
      "Grant excessive privileges that violate continuous improvement least-privilege principles",
      "Select the continuous improvement option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Rely solely on manual processes with no continuous improvement automation",
    ],
    a: 2,
    exp: "Select the continuous improvement option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A AWS Certified Solutions Architect – Professional practice exam scenario covers Design for Organizational Complexity for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate design for organizational complexity least-privilege principles",
      "Rely solely on manual processes with no design for organizational complexity automation",
      "Ignore design for organizational complexity compliance requirements for faster deployment",
      "Design design for organizational complexity using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design design for organizational complexity using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "Which Design for New Solutions principle is emphasized in AWS Certified Solutions Architect – Professional when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned design for new solutions approach recommended in official exam objectives",
      "Rely solely on manual processes with no design for new solutions automation",
      "Ignore design for new solutions compliance requirements for faster deployment",
      "Mix production and test design for new solutions configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned design for new solutions approach recommended in official exam objectives. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A regulated financial institution failed a mock AWS Certified Solutions Architect – Professional question on Migration Planning. What concept should they review?",
    opts: [
      "Ignore migration planning compliance requirements for faster deployment",
      "Follow industry best practices for migration planning as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Mix production and test migration planning configurations in one environment",
      "Store sensitive migration planning credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for migration planning as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "For AWS Certified Solutions Architect – Professional certification, Cost Control knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test cost control configurations in one environment",
      "Store sensitive cost control credentials in plain text configuration files",
      "Implement the standard cost control solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Skip cost control testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard cost control solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A team at a high-traffic e-commerce platform debates Continuous Improvement options while studying AWS Certified Solutions Architect – Professional. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive continuous improvement credentials in plain text configuration files",
      "Skip continuous improvement testing before production rollout",
      "Implement continuous improvement without change management or rollback plans",
      "Use the certified continuous improvement methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified continuous improvement methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "When evaluating Design for Organizational Complexity tools for AWS Certified Solutions Architect – Professional, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement design for organizational complexity without change management or rollback plans",
      "Configure design for organizational complexity according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Use default design for organizational complexity settings without hardening",
      "Centralize all design for organizational complexity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure design for organizational complexity according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A manufacturing company modernizing IT must document Design for New Solutions procedures for AWS Certified Solutions Architect – Professional compliance. Which standard applies?",
    opts: [
      "Use default design for new solutions settings without hardening",
      "Centralize all design for new solutions decisions without stakeholder review",
      "Select the design for new solutions option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Deprecate design for new solutions controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the design for new solutions option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A AWS Certified Solutions Architect – Professional instructor asks about Migration Planning in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all migration planning decisions without stakeholder review",
      "Deprecate migration planning controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses migration planning policies",
      "Design migration planning using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design migration planning using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "Which Cost Control metric best indicates AWS Certified Solutions Architect – Professional readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned cost control approach recommended in official exam objectives",
      "Deprecate cost control controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses cost control policies",
      "Disable monitoring for cost control to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned cost control approach recommended in official exam objectives. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A regulated financial institution is troubleshooting a Continuous Improvement issue while preparing for AWS Certified Solutions Architect – Professional. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses continuous improvement policies",
      "Follow industry best practices for continuous improvement as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Disable monitoring for continuous improvement to improve performance",
      "Grant excessive privileges that violate continuous improvement least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for continuous improvement as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "In AWS Certified Solutions Architect – Professional, how should a healthcare organization handle a trade-off involving Design for Organizational Complexity?",
    opts: [
      "Disable monitoring for design for organizational complexity to improve performance",
      "Grant excessive privileges that violate design for organizational complexity least-privilege principles",
      "Implement the standard design for organizational complexity solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Rely solely on manual processes with no design for organizational complexity automation",
    ],
    a: 2,
    exp: "Implement the standard design for organizational complexity solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "Which Design for New Solutions pattern is commonly tested on AWS Certified Solutions Architect – Professional for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate design for new solutions least-privilege principles",
      "Rely solely on manual processes with no design for new solutions automation",
      "Ignore design for new solutions compliance requirements for faster deployment",
      "Use the certified design for new solutions methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified design for new solutions methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A government agency is preparing for AWS Certified Solutions Architect – Professional and must strengthen Migration Planning. Which option is BEST?",
    opts: [
      "Adopt the migration planning control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Rely solely on manual processes with no migration planning automation",
      "Ignore migration planning compliance requirements for faster deployment",
      "Mix production and test migration planning configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the migration planning control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "During a AWS Certified Solutions Architect – Professional readiness review at a SaaS startup scaling rapidly, which Cost Control approach meets certification objectives?",
    opts: [
      "Ignore cost control compliance requirements for faster deployment",
      "Configure cost control according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Mix production and test cost control configurations in one environment",
      "Store sensitive cost control credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure cost control according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified Solutions Architect – Professional recommends improvements to Continuous Improvement. What should they implement?",
    opts: [
      "Mix production and test continuous improvement configurations in one environment",
      "Store sensitive continuous improvement credentials in plain text configuration files",
      "Select the continuous improvement option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Skip continuous improvement testing before production rollout",
    ],
    a: 2,
    exp: "Select the continuous improvement option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity strategy is MOST appropriate when a media company with global users adopts AWS Certified Solutions Architect – Professional standards?",
    opts: [
      "Store sensitive design for organizational complexity credentials in plain text configuration files",
      "Skip design for organizational complexity testing before production rollout",
      "Implement design for organizational complexity without change management or rollback plans",
      "Design design for organizational complexity using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design design for organizational complexity using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "An audit of a multinational enterprise reveals gaps in Design for New Solutions for AWS Certified Solutions Architect – Professional. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned design for new solutions approach recommended in official exam objectives",
      "Skip design for new solutions testing before production rollout",
      "Implement design for new solutions without change management or rollback plans",
      "Use default design for new solutions settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned design for new solutions approach recommended in official exam objectives. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A regulated financial institution is designing a AWS Certified Solutions Architect – Professional study plan focused on Migration Planning. Which resource topic is essential?",
    opts: [
      "Implement migration planning without change management or rollback plans",
      "Follow industry best practices for migration planning as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Use default migration planning settings without hardening",
      "Centralize all migration planning decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for migration planning as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "When a healthcare organization implements AWS Certified Solutions Architect – Professional controls for Cost Control, which practice reduces operational risk?",
    opts: [
      "Use default cost control settings without hardening",
      "Centralize all cost control decisions without stakeholder review",
      "Implement the standard cost control solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Deprecate cost control controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard cost control solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A AWS Certified Solutions Architect – Professional practice exam scenario covers Continuous Improvement for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Centralize all continuous improvement decisions without stakeholder review",
      "Deprecate continuous improvement controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses continuous improvement policies",
      "Use the certified continuous improvement methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified continuous improvement methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity principle is emphasized in AWS Certified Solutions Architect – Professional when supporting a government agency?",
    opts: [
      "Adopt the design for organizational complexity control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Deprecate design for organizational complexity controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses design for organizational complexity policies",
      "Disable monitoring for design for organizational complexity to improve performance",
    ],
    a: 0,
    exp: "Adopt the design for organizational complexity control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified Solutions Architect – Professional question on Design for New Solutions. What concept should they review?",
    opts: [
      "Use an undocumented workaround that bypasses design for new solutions policies",
      "Configure design for new solutions according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Disable monitoring for design for new solutions to improve performance",
      "Grant excessive privileges that violate design for new solutions least-privilege principles",
    ],
    a: 1,
    exp: "Configure design for new solutions according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "For AWS Certified Solutions Architect – Professional certification, Migration Planning knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Disable monitoring for migration planning to improve performance",
      "Grant excessive privileges that violate migration planning least-privilege principles",
      "Select the migration planning option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Rely solely on manual processes with no migration planning automation",
    ],
    a: 2,
    exp: "Select the migration planning option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A team at a media company with global users debates Cost Control options while studying AWS Certified Solutions Architect – Professional. Which choice aligns with the exam guide?",
    opts: [
      "Grant excessive privileges that violate cost control least-privilege principles",
      "Rely solely on manual processes with no cost control automation",
      "Ignore cost control compliance requirements for faster deployment",
      "Design cost control using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design cost control using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "Which Continuous Improvement capability is validated by AWS Certified Solutions Architect – Professional for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned continuous improvement approach recommended in official exam objectives",
      "Rely solely on manual processes with no continuous improvement automation",
      "Ignore continuous improvement compliance requirements for faster deployment",
      "Mix production and test continuous improvement configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned continuous improvement approach recommended in official exam objectives. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "When evaluating Design for Organizational Complexity tools for AWS Certified Solutions Architect – Professional, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Ignore design for organizational complexity compliance requirements for faster deployment",
      "Follow industry best practices for design for organizational complexity as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Mix production and test design for organizational complexity configurations in one environment",
      "Store sensitive design for organizational complexity credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for design for organizational complexity as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A healthcare organization must document Design for New Solutions procedures for AWS Certified Solutions Architect – Professional compliance. Which standard applies?",
    opts: [
      "Mix production and test design for new solutions configurations in one environment",
      "Store sensitive design for new solutions credentials in plain text configuration files",
      "Implement the standard design for new solutions solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Skip design for new solutions testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard design for new solutions solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A AWS Certified Solutions Architect – Professional instructor asks about Migration Planning in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Store sensitive migration planning credentials in plain text configuration files",
      "Skip migration planning testing before production rollout",
      "Implement migration planning without change management or rollback plans",
      "Use the certified migration planning methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified migration planning methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "Which Cost Control metric best indicates AWS Certified Solutions Architect – Professional readiness for a government agency?",
    opts: [
      "Adopt the cost control control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Skip cost control testing before production rollout",
      "Implement cost control without change management or rollback plans",
      "Use default cost control settings without hardening",
    ],
    a: 0,
    exp: "Adopt the cost control control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A SaaS startup scaling rapidly is troubleshooting a Continuous Improvement issue while preparing for AWS Certified Solutions Architect – Professional. What is the first step?",
    opts: [
      "Implement continuous improvement without change management or rollback plans",
      "Configure continuous improvement according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Use default continuous improvement settings without hardening",
      "Centralize all continuous improvement decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure continuous improvement according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "In AWS Certified Solutions Architect – Professional, how should a manufacturing company modernizing IT handle a trade-off involving Design for Organizational Complexity?",
    opts: [
      "Use default design for organizational complexity settings without hardening",
      "Centralize all design for organizational complexity decisions without stakeholder review",
      "Select the design for organizational complexity option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Deprecate design for organizational complexity controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the design for organizational complexity option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "Which Design for New Solutions pattern is commonly tested on AWS Certified Solutions Architect – Professional for scenarios involving a media company with global users?",
    opts: [
      "Centralize all design for new solutions decisions without stakeholder review",
      "Deprecate design for new solutions controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses design for new solutions policies",
      "Design design for new solutions using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design design for new solutions using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A multinational enterprise is preparing for AWS Certified Solutions Architect – Professional and must strengthen Migration Planning. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned migration planning approach recommended in official exam objectives",
      "Deprecate migration planning controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses migration planning policies",
      "Disable monitoring for migration planning to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned migration planning approach recommended in official exam objectives. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "During a AWS Certified Solutions Architect – Professional readiness review at a regulated financial institution, which Cost Control approach meets certification objectives?",
    opts: [
      "Use an undocumented workaround that bypasses cost control policies",
      "Follow industry best practices for cost control as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Disable monitoring for cost control to improve performance",
      "Grant excessive privileges that violate cost control least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for cost control as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A consultant advising a healthcare organization on AWS Certified Solutions Architect – Professional recommends improvements to Continuous Improvement. What should they implement?",
    opts: [
      "Disable monitoring for continuous improvement to improve performance",
      "Grant excessive privileges that violate continuous improvement least-privilege principles",
      "Implement the standard continuous improvement solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Rely solely on manual processes with no continuous improvement automation",
    ],
    a: 2,
    exp: "Implement the standard continuous improvement solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Solutions Architect – Professional standards?",
    opts: [
      "Grant excessive privileges that violate design for organizational complexity least-privilege principles",
      "Rely solely on manual processes with no design for organizational complexity automation",
      "Ignore design for organizational complexity compliance requirements for faster deployment",
      "Use the certified design for organizational complexity methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified design for organizational complexity methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "An audit of a government agency reveals gaps in Design for New Solutions for AWS Certified Solutions Architect – Professional. Which remediation is CORRECT?",
    opts: [
      "Adopt the design for new solutions control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Rely solely on manual processes with no design for new solutions automation",
      "Ignore design for new solutions compliance requirements for faster deployment",
      "Mix production and test design for new solutions configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the design for new solutions control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Solutions Architect – Professional study plan focused on Migration Planning. Which resource topic is essential?",
    opts: [
      "Ignore migration planning compliance requirements for faster deployment",
      "Configure migration planning according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Mix production and test migration planning configurations in one environment",
      "Store sensitive migration planning credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure migration planning according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "When a manufacturing company modernizing IT implements AWS Certified Solutions Architect – Professional controls for Cost Control, which practice reduces operational risk?",
    opts: [
      "Mix production and test cost control configurations in one environment",
      "Store sensitive cost control credentials in plain text configuration files",
      "Select the cost control option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Skip cost control testing before production rollout",
    ],
    a: 2,
    exp: "Select the cost control option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "A AWS Certified Solutions Architect – Professional practice exam scenario covers Continuous Improvement for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive continuous improvement credentials in plain text configuration files",
      "Skip continuous improvement testing before production rollout",
      "Implement continuous improvement without change management or rollback plans",
      "Design continuous improvement using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design continuous improvement using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity principle is emphasized in AWS Certified Solutions Architect – Professional when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned design for organizational complexity approach recommended in official exam objectives",
      "Skip design for organizational complexity testing before production rollout",
      "Implement design for organizational complexity without change management or rollback plans",
      "Use default design for organizational complexity settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned design for organizational complexity approach recommended in official exam objectives. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A regulated financial institution failed a mock AWS Certified Solutions Architect – Professional question on Design for New Solutions. What concept should they review?",
    opts: [
      "Implement design for new solutions without change management or rollback plans",
      "Follow industry best practices for design for new solutions as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Use default design for new solutions settings without hardening",
      "Centralize all design for new solutions decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for design for new solutions as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "For AWS Certified Solutions Architect – Professional certification, Migration Planning knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Use default migration planning settings without hardening",
      "Centralize all migration planning decisions without stakeholder review",
      "Implement the standard migration planning solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Deprecate migration planning controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard migration planning solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A team at a high-traffic e-commerce platform debates Cost Control options while studying AWS Certified Solutions Architect – Professional. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all cost control decisions without stakeholder review",
      "Deprecate cost control controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses cost control policies",
      "Use the certified cost control methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified cost control methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "Which Continuous Improvement capability is validated by AWS Certified Solutions Architect – Professional for organizations such as a government agency?",
    opts: [
      "Adopt the continuous improvement control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Deprecate continuous improvement controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses continuous improvement policies",
      "Disable monitoring for continuous improvement to improve performance",
    ],
    a: 0,
    exp: "Adopt the continuous improvement control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A manufacturing company modernizing IT must document Design for Organizational Complexity procedures for AWS Certified Solutions Architect – Professional compliance. Which standard applies?",
    opts: [
      "Disable monitoring for design for organizational complexity to improve performance",
      "Grant excessive privileges that violate design for organizational complexity least-privilege principles",
      "Select the design for organizational complexity option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Rely solely on manual processes with no design for organizational complexity automation",
    ],
    a: 2,
    exp: "Select the design for organizational complexity option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A AWS Certified Solutions Architect – Professional instructor asks about Design for New Solutions in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate design for new solutions least-privilege principles",
      "Rely solely on manual processes with no design for new solutions automation",
      "Ignore design for new solutions compliance requirements for faster deployment",
      "Design design for new solutions using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design design for new solutions using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "Which Migration Planning metric best indicates AWS Certified Solutions Architect – Professional readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned migration planning approach recommended in official exam objectives",
      "Rely solely on manual processes with no migration planning automation",
      "Ignore migration planning compliance requirements for faster deployment",
      "Mix production and test migration planning configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned migration planning approach recommended in official exam objectives. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A regulated financial institution is troubleshooting a Cost Control issue while preparing for AWS Certified Solutions Architect – Professional. What is the first step?",
    opts: [
      "Ignore cost control compliance requirements for faster deployment",
      "Follow industry best practices for cost control as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Mix production and test cost control configurations in one environment",
      "Store sensitive cost control credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for cost control as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "In AWS Certified Solutions Architect – Professional, how should a healthcare organization handle a trade-off involving Continuous Improvement?",
    opts: [
      "Mix production and test continuous improvement configurations in one environment",
      "Store sensitive continuous improvement credentials in plain text configuration files",
      "Implement the standard continuous improvement solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Skip continuous improvement testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard continuous improvement solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "Which Design for Organizational Complexity pattern is commonly tested on AWS Certified Solutions Architect – Professional for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Store sensitive design for organizational complexity credentials in plain text configuration files",
      "Skip design for organizational complexity testing before production rollout",
      "Implement design for organizational complexity without change management or rollback plans",
      "Use the certified design for organizational complexity methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified design for organizational complexity methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A government agency is preparing for AWS Certified Solutions Architect – Professional and must strengthen Design for New Solutions. Which option is BEST?",
    opts: [
      "Adopt the design for new solutions control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Skip design for new solutions testing before production rollout",
      "Implement design for new solutions without change management or rollback plans",
      "Use default design for new solutions settings without hardening",
    ],
    a: 0,
    exp: "Adopt the design for new solutions control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "During a AWS Certified Solutions Architect – Professional readiness review at a SaaS startup scaling rapidly, which Migration Planning approach meets certification objectives?",
    opts: [
      "Implement migration planning without change management or rollback plans",
      "Configure migration planning according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Use default migration planning settings without hardening",
      "Centralize all migration planning decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure migration planning according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified Solutions Architect – Professional recommends improvements to Cost Control. What should they implement?",
    opts: [
      "Use default cost control settings without hardening",
      "Centralize all cost control decisions without stakeholder review",
      "Select the cost control option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Deprecate cost control controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the cost control option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "Which Continuous Improvement strategy is MOST appropriate when a media company with global users adopts AWS Certified Solutions Architect – Professional standards?",
    opts: [
      "Centralize all continuous improvement decisions without stakeholder review",
      "Deprecate continuous improvement controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses continuous improvement policies",
      "Design continuous improvement using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design continuous improvement using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "An audit of a multinational enterprise reveals gaps in Design for Organizational Complexity for AWS Certified Solutions Architect – Professional. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified Solutions Architect – Professional-aligned design for organizational complexity approach recommended in official exam objectives",
      "Deprecate design for organizational complexity controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses design for organizational complexity policies",
      "Disable monitoring for design for organizational complexity to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Solutions Architect – Professional-aligned design for organizational complexity approach recommended in official exam objectives. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "A regulated financial institution is designing a AWS Certified Solutions Architect – Professional study plan focused on Design for New Solutions. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses design for new solutions policies",
      "Follow industry best practices for design for new solutions as defined in the AWS Certified Solutions Architect – Professional body of knowledge",
      "Disable monitoring for design for new solutions to improve performance",
      "Grant excessive privileges that violate design for new solutions least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for design for new solutions as defined in the AWS Certified Solutions Architect – Professional body of knowledge. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "When a healthcare organization implements AWS Certified Solutions Architect – Professional controls for Migration Planning, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for migration planning to improve performance",
      "Grant excessive privileges that violate migration planning least-privilege principles",
      "Implement the standard migration planning solution that satisfies AWS Certified Solutions Architect – Professional domain requirements",
      "Rely solely on manual processes with no migration planning automation",
    ],
    a: 2,
    exp: "Implement the standard migration planning solution that satisfies AWS Certified Solutions Architect – Professional domain requirements. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Cost Control ──
  {
    domain: "Cost Control",
    q: "A AWS Certified Solutions Architect – Professional practice exam scenario covers Cost Control for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate cost control least-privilege principles",
      "Rely solely on manual processes with no cost control automation",
      "Ignore cost control compliance requirements for faster deployment",
      "Use the certified cost control methodology specified for AWS Certified Solutions Architect – Professional candidates",
    ],
    a: 3,
    exp: "Use the certified cost control methodology specified for AWS Certified Solutions Architect – Professional candidates. This is the recommended approach for the Cost Control domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Continuous Improvement ──
  {
    domain: "Continuous Improvement",
    q: "Which Continuous Improvement principle is emphasized in AWS Certified Solutions Architect – Professional when supporting a government agency?",
    opts: [
      "Adopt the continuous improvement control framework referenced in AWS Certified Solutions Architect – Professional study materials",
      "Rely solely on manual processes with no continuous improvement automation",
      "Ignore continuous improvement compliance requirements for faster deployment",
      "Mix production and test continuous improvement configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the continuous improvement control framework referenced in AWS Certified Solutions Architect – Professional study materials. This is the recommended approach for the Continuous Improvement domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for Organizational Complexity ──
  {
    domain: "Design for Organizational Complexity",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified Solutions Architect – Professional question on Design for Organizational Complexity. What concept should they review?",
    opts: [
      "Ignore design for organizational complexity compliance requirements for faster deployment",
      "Configure design for organizational complexity according to AWS Certified Solutions Architect – Professional exam blueprint recommendations",
      "Mix production and test design for organizational complexity configurations in one environment",
      "Store sensitive design for organizational complexity credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure design for organizational complexity according to AWS Certified Solutions Architect – Professional exam blueprint recommendations. This is the recommended approach for the Design for Organizational Complexity domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Design for New Solutions ──
  {
    domain: "Design for New Solutions",
    q: "For AWS Certified Solutions Architect – Professional certification, Design for New Solutions knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Mix production and test design for new solutions configurations in one environment",
      "Store sensitive design for new solutions credentials in plain text configuration files",
      "Select the design for new solutions option that meets AWS Certified Solutions Architect – Professional security and governance standards",
      "Skip design for new solutions testing before production rollout",
    ],
    a: 2,
    exp: "Select the design for new solutions option that meets AWS Certified Solutions Architect – Professional security and governance standards. This is the recommended approach for the Design for New Solutions domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },

  // ── Migration Planning ──
  {
    domain: "Migration Planning",
    q: "A team at a media company with global users debates Migration Planning options while studying AWS Certified Solutions Architect – Professional. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive migration planning credentials in plain text configuration files",
      "Skip migration planning testing before production rollout",
      "Implement migration planning without change management or rollback plans",
      "Design migration planning using patterns validated in AWS Certified Solutions Architect – Professional practice assessments",
    ],
    a: 3,
    exp: "Design migration planning using patterns validated in AWS Certified Solutions Architect – Professional practice assessments. This is the recommended approach for the Migration Planning domain on the AWS Certified Solutions Architect – Professional exam and reflects current certification objectives.",
  },
];
