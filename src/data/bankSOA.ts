import type { Question } from '../types';

export const BANK_SOA: Question[] = [
  // ── Monitoring, Logging & Remediation (~14 questions) ──────────────────────
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A SysOps engineer wants to capture all API calls made to AWS services for auditing. Which service should they enable?',
    opts: [
      'Amazon CloudWatch',
      'AWS CloudTrail',
      'AWS Config',
      'Amazon Inspector',
    ],
    a: 1,
    exp: 'AWS CloudTrail records all API calls made to AWS services, providing an audit trail of who did what and when. CloudWatch monitors metrics and logs but does not capture API call history; Config tracks resource configuration changes rather than raw API calls.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A team needs to detect when an EC2 instance\'s CPU utilization exceeds 80% for five consecutive minutes and automatically notify the on-call engineer. What is the correct combination of services?',
    opts: [
      'CloudTrail + SNS',
      'CloudWatch Alarm + SNS',
      'CloudWatch Logs + SQS',
      'AWS Config rule + Lambda',
    ],
    a: 1,
    exp: 'A CloudWatch Alarm can evaluate a metric (CPUUtilization) over a defined period and transition to ALARM state, then publish to an SNS topic to notify the engineer. CloudTrail captures API calls rather than performance metrics; Config evaluates resource configurations, not real-time performance data.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A SysOps administrator needs to query application logs stored in CloudWatch Logs to find all ERROR-level entries from the past 24 hours. Which feature should they use?',
    opts: [
      'CloudWatch Metrics',
      'CloudWatch Logs Insights',
      'CloudWatch Dashboards',
      'AWS CloudTrail Lake',
    ],
    a: 1,
    exp: 'CloudWatch Logs Insights provides an interactive query language for searching and analyzing log data stored in CloudWatch Logs. CloudWatch Metrics stores time-series data points, not log text; Dashboards visualize existing metrics; CloudTrail Lake analyzes CloudTrail events rather than application logs.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'An organization wants to ensure that its CloudTrail log files have not been tampered with after delivery to S3. Which CloudTrail feature should be enabled?',
    opts: [
      'CloudTrail data events',
      'CloudTrail log file validation',
      'CloudTrail Insights',
      'CloudTrail management events',
    ],
    a: 1,
    exp: 'Log file validation causes CloudTrail to create a digitally signed digest file for each hour\'s worth of log files, allowing you to verify that logs have not been modified or deleted. Data events and management events control which API calls are logged; Insights detects unusual API activity patterns.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A company needs to record every S3 object-level operation (GetObject, PutObject, DeleteObject) in CloudTrail. What must they configure?',
    opts: [
      'Enable management events for S3',
      'Enable data events for S3 in the CloudTrail trail',
      'Create a CloudTrail Insights rule for S3',
      'Configure an S3 bucket policy to log to CloudTrail',
    ],
    a: 1,
    exp: 'Data events capture object-level API operations on S3 (and Lambda function invocations). Management events capture control-plane operations like CreateBucket or DeleteBucket but not individual object access. Insights detects anomalous write activity; bucket policies control access permissions, not CloudTrail logging.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A SysOps engineer installs the CloudWatch Agent on an EC2 Linux instance. After installation the agent fails to send metrics. What is the most likely cause?',
    opts: [
      'CloudWatch does not support Linux instances',
      'The EC2 instance profile lacks the CloudWatchAgentServerPolicy',
      'The agent must be installed via AWS Systems Manager only',
      'CloudWatch Agent requires a NAT gateway for metric delivery',
    ],
    a: 1,
    exp: 'The CloudWatch Agent uses the instance\'s IAM role to authenticate when publishing metrics. Without the CloudWatchAgentServerPolicy (or equivalent permissions), PutMetricData calls will be denied. CloudWatch fully supports Linux; the agent can be installed manually or via SSM; a VPC endpoint or internet route is needed but an IAM permission gap is the most common cause of failure.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'An AWS Config rule is evaluating whether all EC2 instances use approved AMIs. A non-compliant instance is found. How can AWS Config automatically remediate this finding?',
    opts: [
      'Enable AWS Config continuous recording',
      'Associate an AWS Config remediation action with an SSM Automation document',
      'Create a CloudWatch Events rule to trigger a Lambda function',
      'Use AWS Trusted Advisor to fix the AMI',
    ],
    a: 1,
    exp: 'AWS Config supports remediation actions that invoke SSM Automation documents automatically when a resource is found non-compliant. Continuous recording determines how often Config evaluates resources, not how it fixes them; Trusted Advisor provides recommendations but cannot auto-remediate Config findings; a CloudWatch/EventBridge approach also works but is not the native Config mechanism.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A company needs to enforce a standard set of AWS Config rules across 50 AWS accounts in an organization. What is the most efficient approach?',
    opts: [
      'Deploy a CloudFormation StackSet with individual Config rules',
      'Use an AWS Config conformance pack deployed via AWS Organizations',
      'Manually create Config rules in each account',
      'Use AWS Security Hub standards instead',
    ],
    a: 1,
    exp: 'Conformance packs bundle multiple Config rules and remediation actions into a single deployable unit that can be deployed across an entire AWS Organization from the management account. StackSets can deploy CloudFormation templates but conformance packs are the native Config multi-account mechanism. Manual creation is not scalable; Security Hub aggregates findings but does not replace Config rules.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A SysOps engineer wants to trigger a Lambda function whenever an EC2 instance changes state (e.g., from running to stopped). Which service should route this event?',
    opts: [
      'AWS CloudTrail',
      'Amazon EventBridge',
      'Amazon SQS',
      'AWS Config',
    ],
    a: 1,
    exp: 'Amazon EventBridge (formerly CloudWatch Events) receives EC2 state-change notifications as events and can route them to a Lambda function target based on an event pattern rule. CloudTrail records the API call that caused the change but does not natively route events to Lambda; SQS is a message queue with no built-in event routing; Config detects configuration changes rather than state changes in real time.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'An administrator needs to run a shell script on 200 EC2 instances simultaneously without SSH access. Which Systems Manager feature accomplishes this?',
    opts: [
      'Systems Manager Session Manager',
      'Systems Manager Run Command',
      'Systems Manager Patch Manager',
      'Systems Manager Automation',
    ],
    a: 1,
    exp: 'Run Command allows you to remotely and securely execute scripts or commands on managed EC2 instances at scale without opening SSH ports. Session Manager provides interactive shell access to individual instances. Patch Manager handles OS patching workflows; Automation runs multi-step operational runbooks but is designed for document-based workflows, not raw script execution across a fleet.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A company stores database passwords in plaintext in an EC2 user data script. The security team demands a more secure approach that supports automatic rotation. Which Systems Manager feature best addresses this?',
    opts: [
      'Systems Manager Parameter Store SecureString with AWS Secrets Manager rotation',
      'AWS Secrets Manager alone',
      'Systems Manager Parameter Store SecureString (Standard tier)',
      'Both Systems Manager Parameter Store SecureString and AWS Secrets Manager satisfy the requirement; Secrets Manager adds built-in rotation',
    ],
    a: 3,
    exp: 'AWS Secrets Manager natively supports automatic rotation of secrets (including database credentials) using Lambda. Parameter Store SecureString encrypts values with KMS but does not offer built-in automatic rotation. The question requires both secure storage and automatic rotation, making Secrets Manager the complete answer, though both services can store the secret securely.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A SysOps team needs a real-time view of CPU, memory, disk I/O, and network metrics for 10 EC2 instances on a single screen. Which approach achieves this?',
    opts: [
      'Create an AWS Config multi-resource dashboard',
      'Build a CloudWatch Dashboard with widgets for each metric',
      'Use CloudTrail Lake to query metrics',
      'Enable VPC Flow Logs and visualize in Athena',
    ],
    a: 1,
    exp: 'CloudWatch Dashboards provide customizable, real-time views of CloudWatch metrics across multiple resources in a single pane. Config dashboards show compliance status, not performance metrics; CloudTrail Lake stores API event data, not performance metrics; VPC Flow Logs capture network traffic metadata, not CPU or disk metrics.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'An operations team uses Systems Manager Patch Manager to patch a fleet of Windows EC2 instances every Sunday at 2 AM. Which two components must be configured?',
    opts: [
      'A patch baseline and a maintenance window',
      'A patch baseline and an SSM Run Command document',
      'A maintenance window and a CloudWatch alarm',
      'A patch group tag and a CloudFormation stack',
    ],
    a: 0,
    exp: 'Patch Manager requires a patch baseline (defining which patches are approved) and a maintenance window (defining when patching runs and on which targets). Run Command is the underlying mechanism that Patch Manager uses, but administrators configure baselines and windows, not raw Run Command documents. CloudWatch alarms are for monitoring; CloudFormation is for infrastructure deployment.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A CloudWatch Logs metric filter is configured to count "ERROR" occurrences in an application log group, but the CloudWatch alarm never triggers despite many errors appearing in the logs. What is the most likely cause?',
    opts: [
      'CloudWatch Logs metric filters do not support string patterns',
      'The metric filter was created after the log events were written and only applies to new log data',
      'The alarm threshold must be 0 for string-based metrics',
      'Metric filters require CloudTrail to be enabled',
    ],
    a: 1,
    exp: 'CloudWatch Logs metric filters apply only to log events ingested after the filter is created; they do not backfill historical data. If the errors occurred before the filter was created, they are not counted. String patterns are supported; the threshold is configurable; CloudTrail is unrelated to log metric filters.',
  },

  // ── Reliability & Business Continuity (~11 questions) ─────────────────────
  {
    domain: 'Reliability & Business Continuity',
    q: 'An application\'s Auto Scaling group needs to complete a database connection drain before terminating instances. Which Auto Scaling feature enables this?',
    opts: [
      'Scheduled scaling',
      'Lifecycle hooks',
      'Predictive scaling',
      'Instance warm-up',
    ],
    a: 1,
    exp: 'Lifecycle hooks pause an instance in a wait state (e.g., Terminating:Wait) so that custom actions such as connection draining or log shipping can complete before the instance is fully terminated. Scheduled scaling adjusts capacity at predefined times; predictive scaling forecasts demand; instance warm-up delays health check evaluation for newly launched instances.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A retail company experiences a traffic spike every Friday at 6 PM. They want Auto Scaling to add capacity in advance of the spike. Which scaling policy is most appropriate?',
    opts: [
      'Target tracking scaling',
      'Step scaling',
      'Scheduled scaling',
      'Predictive scaling',
    ],
    a: 2,
    exp: 'Scheduled scaling pre-provisions capacity at a specific date and time, which is ideal for predictable, time-based traffic patterns like a weekly spike. Target tracking and step scaling react to current metric values after the spike begins. Predictive scaling uses ML to forecast demand automatically but requires sufficient historical data and may not align exactly with a fixed weekly schedule.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'An RDS MySQL database must remain available during an Availability Zone failure with zero manual intervention. Which RDS feature provides this?',
    opts: [
      'RDS Read Replica in a second AZ',
      'RDS Multi-AZ deployment',
      'Aurora Global Database',
      'RDS automated backups',
    ],
    a: 1,
    exp: 'RDS Multi-AZ maintains a synchronous standby replica in a different AZ and automatically fails over to it within 1–2 minutes if the primary fails, requiring no manual intervention. Read Replicas are asynchronous and are not promoted automatically on failure; Aurora Global Database spans regions; automated backups restore data but do not prevent downtime.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A company\'s Aurora MySQL cluster in us-east-1 needs a disaster recovery solution with a recovery time objective (RTO) of under one minute in case the entire primary region fails. What should they implement?',
    opts: [
      'Aurora Multi-AZ cluster',
      'Aurora read replicas in us-west-2',
      'Aurora Global Database with a secondary cluster in us-west-2',
      'RDS Multi-AZ with cross-region read replica',
    ],
    a: 2,
    exp: 'Aurora Global Database replicates data to secondary regions with typical lag under one second and supports managed failover in under one minute. A Multi-AZ cluster protects against AZ-level failures, not region-level. Standard Aurora read replicas in another region are manual and slower to promote; RDS Multi-AZ cross-region read replicas have higher promotion complexity and latency.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A DynamoDB table is used by a globally distributed application. Users in Europe complain of high read latency. What is the best solution that also provides disaster recovery?',
    opts: [
      'Enable DynamoDB Accelerator (DAX)',
      'Add a DynamoDB global table replica in the EU region',
      'Increase DynamoDB read capacity units',
      'Enable DynamoDB Streams and replicate manually',
    ],
    a: 1,
    exp: 'DynamoDB global tables provide multi-region, active-active replication with automatic conflict resolution, reducing read latency for European users while also serving as a disaster recovery solution. DAX is an in-memory cache that helps only within a single region; increasing RCUs addresses throughput, not geographic latency; manual stream-based replication is complex and error-prone.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A regulatory requirement mandates that S3 objects in the production bucket cannot be deleted or overwritten for seven years. Which combination of features satisfies this?',
    opts: [
      'S3 Versioning + S3 Lifecycle policy',
      'S3 Object Lock in Compliance mode + S3 Versioning',
      'S3 MFA Delete alone',
      'S3 Cross-Region Replication + bucket policy',
    ],
    a: 1,
    exp: 'S3 Object Lock in Compliance mode enforces a retention period during which no user, including the root account, can delete or overwrite objects; it requires Versioning to be enabled. MFA Delete adds a factor to version deletion but does not enforce a fixed retention period. Lifecycle policies move or expire objects; CRR replicates data but does not prevent deletion of the original.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A company needs to replicate S3 objects from a bucket in us-east-1 to a bucket in eu-west-1 to meet data residency requirements. Only objects uploaded after replication is enabled should be replicated. Which feature achieves this?',
    opts: [
      'S3 Versioning on the destination bucket only',
      'S3 Cross-Region Replication with Versioning enabled on both buckets',
      'AWS DataSync scheduled job',
      'S3 Batch Operations copy job',
    ],
    a: 1,
    exp: 'S3 Cross-Region Replication (CRR) asynchronously copies new objects to a bucket in another region and requires Versioning to be enabled on both source and destination buckets. CRR does not replicate objects that existed before replication was enabled. DataSync is used for bulk data migration, not ongoing replication; Batch Operations copies existing objects in a one-time job.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'An application stores critical data on an EBS volume. A SysOps engineer wants to ensure that point-in-time backups are taken daily and retained for 30 days with minimal management overhead. What is the best approach?',
    opts: [
      'Write a cron job on the EC2 instance to call aws ec2 create-snapshot',
      'Use Amazon Data Lifecycle Manager (DLM) with a snapshot policy',
      'Use AWS Backup with a backup plan targeting the EBS volume',
      'Both B and C are correct; AWS Backup is preferred for multi-service backup governance',
    ],
    a: 3,
    exp: 'Both Amazon DLM (EBS-specific) and AWS Backup (multi-service) can automate EBS snapshots on a schedule with configurable retention. AWS Backup is preferred when centralized governance across multiple AWS services is required. A manual cron job is fragile and operationally heavy. Either managed service satisfies the requirement, making option D the most complete answer.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A Route 53 health check is configured for an ALB endpoint. The ALB becomes unhealthy and Route 53 must automatically redirect traffic to a standby ALB in a different region. Which routing policy should be used?',
    opts: [
      'Latency-based routing',
      'Weighted routing',
      'Failover routing',
      'Geolocation routing',
    ],
    a: 2,
    exp: 'Route 53 Failover routing designates a primary and a secondary record; if the primary\'s associated health check fails, Route 53 automatically answers queries with the secondary record. Latency-based routing chooses the lowest-latency endpoint regardless of health; weighted routing distributes traffic by weight; geolocation routing directs based on user location.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'An Auto Scaling group uses an ELB health check. An instance passes EC2 status checks but the application on port 80 is returning 503 errors. What will the Auto Scaling group do?',
    opts: [
      'Nothing; Auto Scaling only uses EC2 status checks by default',
      'Terminate and replace the instance because the ELB health check fails',
      'Put the instance in a Standby state automatically',
      'Send an SNS notification but keep the instance running',
    ],
    a: 1,
    exp: 'When an Auto Scaling group is configured to use ELB health checks, a failed ELB health check (such as a 503 response) causes Auto Scaling to mark the instance as unhealthy and replace it, even if the underlying EC2 instance passes its EC2 status checks. Using EC2 health checks alone would miss application-level failures.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A company runs a stateful application on EC2 and uses Auto Scaling. During a scale-in event they need to back up in-memory session data before the instance terminates. What is the correct design?',
    opts: [
      'Increase the Auto Scaling cooldown period',
      'Use a lifecycle hook on the Terminating transition to trigger a Lambda that saves session data',
      'Use instance warm-up to delay termination',
      'Configure a CloudWatch alarm to pause scale-in',
    ],
    a: 1,
    exp: 'A lifecycle hook on the Terminating transition pauses the instance in Terminating:Wait state, allowing a Lambda function (or SSM document) to save session data before the instance is terminated. The cooldown period throttles scaling actions but does not pause termination for cleanup; instance warm-up applies to launched instances; CloudWatch alarms cannot directly pause in-progress terminations.',
  },

  // ── Deployment, Provisioning & Automation (~13 questions) ─────────────────
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A CloudFormation stack update is failing and rolling back. The engineer suspects the stack has drifted from its template. How can they confirm this before the next update?',
    opts: [
      'Run aws cloudformation validate-template',
      'Initiate a drift detection operation on the stack',
      'Use AWS Config to compare the stack to its template',
      'Check the stack events for DriftDetected errors',
    ],
    a: 1,
    exp: 'CloudFormation drift detection compares the actual configuration of stack resources against the expected template configuration and reports which resources have drifted. validate-template checks template syntax, not resource state; Config tracks configuration changes but is not the CloudFormation-native drift tool; stack events show operation history, not drift.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A SysOps engineer needs to deploy identical CloudFormation stacks to 20 AWS accounts across three regions simultaneously from an Organizations management account. Which feature is purpose-built for this?',
    opts: [
      'CloudFormation nested stacks',
      'CloudFormation StackSets',
      'AWS Service Catalog',
      'AWS CodePipeline with CloudFormation deploy action',
    ],
    a: 1,
    exp: 'CloudFormation StackSets extend stacks to multiple accounts and regions from a single operation, with integration into AWS Organizations for automatic deployment to accounts in OUs. Nested stacks decompose a single-account stack; Service Catalog manages approved product portfolios; CodePipeline orchestrates CI/CD but requires additional configuration for multi-account deployment.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'Before executing a CloudFormation stack update, a SysOps engineer wants to preview which resources will be added, modified, or deleted. Which CloudFormation feature provides this?',
    opts: [
      'Stack drift detection',
      'Change sets',
      'Rollback triggers',
      'Stack policies',
    ],
    a: 1,
    exp: 'Change sets allow you to preview the proposed changes to a stack before executing the update, showing which resources will be added, modified, or replaced. Drift detection shows differences between the current live state and the template. Rollback triggers define CloudWatch alarms that cause a rollback if breached; stack policies protect resources from unintended updates.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A CloudFormation template bootstraps an EC2 instance using cfn-init. How does the stack know when the instance has finished bootstrapping successfully?',
    opts: [
      'CloudFormation polls the EC2 instance every 30 seconds',
      'The cfn-signal helper sends a success or failure signal to the WaitCondition or CreationPolicy',
      'The instance sends an SNS notification to CloudFormation',
      'CloudFormation checks the EC2 instance status checks',
    ],
    a: 1,
    exp: 'cfn-signal sends a success or failure signal to a CloudFormation WaitCondition or to the resource\'s CreationPolicy, allowing the stack to pause until the instance reports readiness. CloudFormation does not poll instances; SNS is not the signaling mechanism; EC2 status checks confirm hardware health, not application bootstrapping.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A production CloudFormation stack update begins to cause application errors. A CloudWatch alarm enters ALARM state during the update. How can the stack automatically roll back when this happens?',
    opts: [
      'Set the stack\'s OnFailure parameter to ROLLBACK',
      'Configure rollback triggers that reference the CloudWatch alarm ARN',
      'Enable drift detection during the update',
      'Use a change set with automatic rollback',
    ],
    a: 1,
    exp: 'CloudFormation rollback triggers let you specify CloudWatch alarm ARNs; if any referenced alarm enters ALARM state during the update or within a monitoring period after, CloudFormation automatically rolls back the stack. OnFailure only applies to initial stack creation failures; drift detection is a separate concern; change sets preview changes but do not trigger automatic rollback on alarm.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'An organization wants to allow developers to self-service the creation of pre-approved, standardized EC2 environments including VPCs and IAM roles, without giving them direct CloudFormation or IAM permissions. Which AWS service is designed for this?',
    opts: [
      'AWS CloudFormation StackSets',
      'AWS Service Catalog',
      'AWS Systems Manager Automation',
      'AWS Config conformance packs',
    ],
    a: 1,
    exp: 'AWS Service Catalog allows administrators to create portfolios of approved CloudFormation-backed products. Developers can launch products without needing direct CloudFormation or IAM permissions because Service Catalog assumes a launch role on their behalf. StackSets deploy across accounts but require CloudFormation permissions; SSM Automation runs operational tasks; conformance packs enforce compliance rules.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A SysOps engineer needs to create a golden AMI from an existing EC2 instance, apply OS patches, install agents, and then share the AMI with multiple accounts on a recurring schedule. Which service automates this pipeline?',
    opts: [
      'AWS CodeBuild with Packer',
      'EC2 Image Builder',
      'Systems Manager Automation with CreateImage action',
      'Amazon Inspector with AMI scanning',
    ],
    a: 1,
    exp: 'EC2 Image Builder provides a managed pipeline to build, test, and distribute AMIs on a schedule, including patching, component installation, and AMI sharing with other accounts. CodeBuild/Packer can achieve this but require significant custom setup; SSM Automation can create images but lacks the full pipeline and scheduling; Inspector scans for vulnerabilities but does not build AMIs.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'During an Elastic Beanstalk deployment, the health of the environment changes to "Degraded." Where should the SysOps engineer look first to diagnose the root cause?',
    opts: [
      'AWS CloudTrail API history',
      'Elastic Beanstalk environment health dashboard and instance logs',
      'AWS Config configuration timeline',
      'Amazon Inspector findings',
    ],
    a: 1,
    exp: 'The Elastic Beanstalk environment health dashboard shows the cause of degraded health (e.g., failed health checks, deployment errors) and provides access to instance logs and event history. CloudTrail shows API calls that triggered deployments but not application-level errors; Config tracks configuration changes; Inspector scans for security vulnerabilities.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A SysOps engineer wants to use AWS Systems Manager Automation to stop all EC2 instances tagged "Environment=Dev" every weekday at 8 PM. What is required?',
    opts: [
      'A Systems Manager Automation document and an EventBridge scheduled rule as the trigger',
      'A Systems Manager Run Command document and a CloudWatch alarm',
      'A Lambda function triggered by CloudTrail',
      'An AWS Config remediation action',
    ],
    a: 0,
    exp: 'SSM Automation documents define the steps (e.g., aws:stopInstances) and EventBridge scheduled rules can invoke the Automation document on a cron schedule. Run Command runs scripts rather than structured Automation runbooks; a Lambda/CloudTrail approach is more complex; Config remediation reacts to compliance findings, not time-based schedules.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A CloudFormation stack creation fails because an IAM role referenced in the template does not have the CAPABILITY_IAM capability acknowledged. What must the engineer do?',
    opts: [
      'Add the IAM role to a separate stack and import it',
      'Acknowledge CAPABILITY_IAM or CAPABILITY_NAMED_IAM when creating the stack',
      'Enable drift detection before creating the stack',
      'Use a Service Catalog product instead of direct CloudFormation',
    ],
    a: 1,
    exp: 'CloudFormation requires explicit acknowledgment (CAPABILITY_IAM for generic IAM resources, CAPABILITY_NAMED_IAM for named IAM resources) to protect against unintended privilege escalation. This is passed via the --capabilities flag in the CLI or acknowledged in the console. Importing the role avoids the issue but is more complex; drift detection is unrelated; Service Catalog is an alternative but not a direct fix.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A company uses OpsWorks Stacks to manage a Chef-based application deployment. The Chef recipes are failing on new EC2 instances. Where are the Chef run logs located?',
    opts: [
      'AWS CloudTrail event history',
      'Amazon CloudWatch Logs via the OpsWorks CloudWatch Logs integration or the instance /var/log/aws/opsworks/ directory',
      'AWS Config configuration recorder',
      'Elastic Beanstalk request logs',
    ],
    a: 1,
    exp: 'OpsWorks Stacks can stream Chef run logs to CloudWatch Logs, and they are also written locally on the instance under /var/log/aws/opsworks/. CloudTrail shows the OpsWorks API calls (CreateDeployment, etc.) but not Chef recipe output; Config tracks infrastructure configuration; Elastic Beanstalk is a separate service.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'An AMI created six months ago is being used to launch new EC2 instances. The security team discovers the AMI is missing recent OS patches. What is the best long-term solution?',
    opts: [
      'Manually patch running instances and create new AMIs monthly',
      'Use EC2 Image Builder to create a pipeline that builds and tests a patched AMI on a weekly schedule',
      'Use Systems Manager Patch Manager to patch instances at launch and skip AMI updates',
      'Enable AWS Inspector on all instances built from the AMI',
    ],
    a: 1,
    exp: 'EC2 Image Builder automates the build, patch, test, and distribution of AMIs on a schedule, ensuring new instances always launch from a current, patched image. Manual AMI creation is error-prone; Patch Manager patches running instances but does not bake patches into AMIs; Inspector scans for vulnerabilities but does not remediate the AMI itself.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A SysOps engineer is deploying a CloudFormation template that creates an RDS instance. The stack creation fails and the RDS instance is deleted. On inspection the instance logs show a malformed DB parameter. How can the engineer preserve the RDS instance for debugging after the rollback?',
    opts: [
      'Set the DeletionPolicy to Retain on the RDS resource in the template',
      'Disable automatic rollback on the stack',
      'Use a change set to preview the failure',
      'Enable CloudFormation drift detection',
    ],
    a: 0,
    exp: 'Setting DeletionPolicy: Retain on a resource causes CloudFormation to preserve it even when the stack is deleted or rolls back, allowing post-mortem investigation. Disabling automatic rollback leaves the stack in a failed state and also preserves resources, but Retain is the cleaner resource-level control. Change sets preview changes; drift detection compares live vs. template state.',
  },

  // ── Security & Compliance (~11 questions) ─────────────────────────────────
  {
    domain: 'Security & Compliance',
    q: 'A security team notices that an IAM role has permissions that may allow access to sensitive S3 buckets from external accounts. Which service can automatically identify this unintended external access?',
    opts: [
      'AWS GuardDuty',
      'AWS IAM Access Analyzer',
      'AWS Security Hub',
      'Amazon Inspector',
    ],
    a: 1,
    exp: 'IAM Access Analyzer uses automated reasoning to identify resource-based policies (S3 bucket policies, IAM roles trusts, KMS key policies, etc.) that grant access to external principals outside the zone of trust. GuardDuty detects threats from behavior; Security Hub aggregates findings; Inspector scans for software vulnerabilities.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A company wants to prevent any AWS account in its organization from disabling AWS CloudTrail. Which mechanism enforces this across all member accounts?',
    opts: [
      'IAM permission boundaries on all users',
      'AWS Organizations Service Control Policy (SCP) denying cloudtrail:StopLogging',
      'AWS Config rule checking CloudTrail status',
      'IAM role trust policies',
    ],
    a: 1,
    exp: 'SCPs are applied at the OU or account level in AWS Organizations and act as guardrails that limit what actions are allowed even if a user has an IAM policy granting permission. Denying cloudtrail:StopLogging via an SCP prevents any principal in the account from disabling CloudTrail. IAM permission boundaries apply to individual roles; Config rules detect non-compliance but do not prevent the action; trust policies control who can assume a role.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A SysOps administrator needs to grant a third-party application temporary access to a KMS key to decrypt specific data. The access should be revocable without changing the key policy. Which KMS feature is appropriate?',
    opts: [
      'KMS key aliases',
      'KMS grants',
      'KMS key rotation',
      'KMS multi-Region keys',
    ],
    a: 1,
    exp: 'KMS grants delegate specific key operations to a grantee (IAM user, role, or AWS service) without modifying the key policy. Grants can be revoked independently of the key policy, making them ideal for temporary or programmatic access. Key aliases are friendly names; key rotation replaces backing key material; multi-Region keys replicate keys across regions.',
  },
  {
    domain: 'Security & Compliance',
    q: 'VPC Flow Logs are enabled on a production VPC. A security analyst wants to identify which EC2 instance is making outbound connections to a known malicious IP address. Where should they query the flow log data most efficiently?',
    opts: [
      'CloudWatch Logs Insights if logs are delivered to CloudWatch Logs',
      'AWS CloudTrail event history',
      'Amazon Inspector network reachability findings',
      'AWS Config resource timeline',
    ],
    a: 0,
    exp: 'When VPC Flow Logs are delivered to CloudWatch Logs, CloudWatch Logs Insights provides a fast, interactive query interface to filter flow records by destination IP, source IP, or instance. If delivered to S3, Athena would be used instead. CloudTrail records API calls, not network traffic; Inspector assesses reachability but does not provide flow-level traffic analysis; Config tracks resource configuration.',
  },
  {
    domain: 'Security & Compliance',
    q: 'Amazon GuardDuty reports a finding of type "UnauthorizedAccess:IAMUser/MaliciousIPCaller." What is the recommended first response?',
    opts: [
      'Terminate all EC2 instances in the account',
      'Rotate or revoke the credentials associated with the IAM user identified in the finding',
      'Disable GuardDuty to prevent false positives',
      'Create a new VPC and migrate all resources',
    ],
    a: 1,
    exp: 'The finding indicates that IAM API calls are being made from a known malicious IP using specific IAM credentials. The immediate response is to revoke or rotate those credentials to stop unauthorized access. Terminating EC2 instances or migrating resources is disproportionate and unlikely to address credential misuse; disabling GuardDuty removes threat detection.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A company needs to ensure that all S3 buckets in an AWS account are not publicly accessible. Which AWS Config managed rule can verify this continuously?',
    opts: [
      's3-bucket-ssl-requests-only',
      's3-bucket-public-read-prohibited',
      's3-bucket-logging-enabled',
      's3-bucket-versioning-enabled',
    ],
    a: 1,
    exp: 's3-bucket-public-read-prohibited checks whether S3 buckets have public read access enabled and marks them non-compliant if they do. s3-bucket-ssl-requests-only enforces HTTPS; s3-bucket-logging-enabled checks server access logging; s3-bucket-versioning-enabled checks whether versioning is on.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A security team wants a centralized dashboard that aggregates GuardDuty findings, IAM Access Analyzer findings, and Config compliance results across 30 AWS accounts. Which service provides this?',
    opts: [
      'AWS CloudTrail Lake',
      'AWS Security Hub',
      'Amazon Macie',
      'AWS Trusted Advisor',
    ],
    a: 1,
    exp: 'AWS Security Hub collects and normalizes findings from GuardDuty, IAM Access Analyzer, Config, Inspector, Macie, and other services into a single, multi-account dashboard. CloudTrail Lake aggregates API event data; Macie focuses on S3 data classification; Trusted Advisor provides best-practice checks but does not aggregate security findings from other services.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A web application is experiencing an HTTP flood attack that is consuming ALB capacity. The security team wants to automatically block IPs sending more than 2,000 requests per 5 minutes. Which service and feature accomplish this?',
    opts: [
      'AWS Shield Standard with rate-based rules',
      'AWS WAF rate-based rule associated with the ALB',
      'ALB connection draining',
      'Amazon GuardDuty with automated response Lambda',
    ],
    a: 1,
    exp: 'AWS WAF rate-based rules count requests from a single IP over a 5-minute window and automatically block the IP when the threshold is exceeded. Shield Standard protects against volumetric DDoS at layers 3/4 but does not have rate-based HTTP rules; ALB connection draining manages graceful shutdown of backend instances; GuardDuty detects threats but requires additional tooling for WAF-level blocking.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A company wants AWS Shield Advanced to provide DDoS cost protection and 24/7 access to the AWS DDoS Response Team (DRT). What must be true for the company to access these benefits?',
    opts: [
      'The company must be enrolled in AWS Business Support',
      'The company must subscribe to AWS Shield Advanced and have at least AWS Business or Enterprise Support',
      'Shield Advanced is automatically enabled for all accounts',
      'The company only needs to enable GuardDuty',
    ],
    a: 1,
    exp: 'AWS Shield Advanced requires an explicit subscription ($3,000/month organizational rate) and access to the DRT is available only to customers with Business or Enterprise Support plans. Shield Standard is automatically included for all AWS customers but does not include DRT access or cost protection. GuardDuty is unrelated to DDoS protection.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A SysOps engineer needs to ensure that KMS customer-managed keys are rotated annually without application changes. How should they configure this?',
    opts: [
      'Manually create a new KMS key each year and update all references',
      'Enable automatic key rotation on the KMS customer-managed key',
      'Use KMS multi-Region key replication',
      'Configure an EventBridge rule to call kms:RotateKey annually',
    ],
    a: 1,
    exp: 'Enabling automatic key rotation on a CMK causes KMS to rotate the underlying cryptographic material every year. The key ID, ARN, and alias remain unchanged, so no application changes are needed. Manual rotation requires updating all references; multi-Region keys replicate across regions for low-latency use cases; there is no kms:RotateKey API—rotation is configured as a key property.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A company uses AWS Organizations. The security team wants to ensure no account can create internet gateways in any VPC. Which approach is correct?',
    opts: [
      'Create an IAM policy in every account denying ec2:CreateInternetGateway',
      'Attach an SCP to the root OU denying ec2:CreateInternetGateway',
      'Use AWS Config to detect and auto-delete internet gateways',
      'Enable GuardDuty to alert on internet gateway creation',
    ],
    a: 1,
    exp: 'An SCP attached to the root OU denying ec2:CreateInternetGateway acts as an organization-wide guardrail that cannot be overridden by IAM policies in member accounts. Managing IAM policies in every account is operationally expensive and not guaranteed. Config can detect and remediate after the fact but cannot prevent the action; GuardDuty alerts on suspicious activity but does not prevent API calls.',
  },

  // ── Networking & Content Delivery (~13 questions) ──────────────────────────
  {
    domain: 'Networking & Content Delivery',
    q: 'A company is planning a VPC with private subnets in three Availability Zones and needs to avoid CIDR conflicts with an existing on-premises network using 10.0.0.0/8. Which VPC CIDR range should they choose?',
    opts: [
      '10.50.0.0/16',
      '172.31.0.0/16',
      '192.168.10.0/24',
      '172.16.50.0/16',
    ],
    a: 3,
    exp: 'The on-premises network uses 10.0.0.0/8, which covers all 10.x.x.x addresses. Any 10.x.x.x CIDR would overlap. 172.31.0.0/16 is the default VPC CIDR (reserved in many accounts). 192.168.10.0/24 is a valid option but too small for three AZs with growth room. 172.16.50.0/16 uses the 172.16.0.0/12 private range and does not conflict with 10.0.0.0/8.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'Two VPCs need to communicate privately. VPC-A is 10.1.0.0/16 and VPC-B is 10.2.0.0/16. They do not need transitive routing. What is the simplest solution?',
    opts: [
      'AWS Transit Gateway',
      'VPC Peering connection',
      'Site-to-Site VPN between the two VPCs',
      'AWS Direct Connect Private VIF',
    ],
    a: 1,
    exp: 'A VPC peering connection provides direct private communication between two VPCs without transitive routing, and it is the simplest and cheapest option for two VPCs. Transit Gateway supports transitive routing and is better suited for hub-and-spoke topologies with many VPCs. VPN and Direct Connect are for on-premises-to-AWS connectivity.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A company has 20 VPCs and an on-premises data center that all need to communicate with each other. They want centralized control and transitive routing. Which service is best suited?',
    opts: [
      'VPC Peering (full mesh)',
      'AWS Transit Gateway',
      'AWS Direct Connect Public VIF',
      'AWS PrivateLink',
    ],
    a: 1,
    exp: 'AWS Transit Gateway acts as a cloud router, enabling transitive routing between VPCs and on-premises networks through a single hub. A full mesh of VPC peering connections for 20 VPCs would require up to 190 peering connections and does not scale. Direct Connect Public VIF is for public AWS services; PrivateLink exposes services privately but does not provide general VPC-to-VPC routing.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A company connects its on-premises data center to AWS using Site-to-Site VPN. The connection is stable but throughput is limited to 1.25 Gbps and latency is inconsistent. What should they use to improve performance and reliability?',
    opts: [
      'Add a second VPN tunnel',
      'Upgrade to AWS Direct Connect',
      'Use AWS Global Accelerator',
      'Enable VPN acceleration on the Virtual Private Gateway',
    ],
    a: 1,
    exp: 'AWS Direct Connect provides dedicated private network connectivity with consistent latency and higher bandwidth (up to 100 Gbps) compared to VPN over the public internet. Adding a second VPN tunnel provides redundancy but does not significantly increase throughput beyond VPN limits; Global Accelerator optimizes routing for internet traffic; VPN acceleration (Accelerated Site-to-Site VPN) uses Global Accelerator edge but still traverses the internet.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'An enterprise needs Direct Connect connectivity to AWS. They need access to only their VPCs (private IP space), not public AWS services. Which VIF type should they configure?',
    opts: [
      'Public Virtual Interface',
      'Private Virtual Interface',
      'Transit Virtual Interface',
      'Hosted Virtual Interface',
    ],
    a: 1,
    exp: 'A Private Virtual Interface (VIF) connects a Direct Connect link to a Virtual Private Gateway or Transit Gateway, enabling access to VPC private IP addresses. A Public VIF provides access to public AWS service endpoints. A Transit VIF connects to a Direct Connect Gateway associated with a Transit Gateway; a Hosted VIF is a VIF provisioned by an AWS Direct Connect partner.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A global application needs to route users to the nearest healthy endpoint across multiple AWS regions, with static Anycast IP addresses. Which service provides this?',
    opts: [
      'Amazon Route 53 latency-based routing',
      'AWS Global Accelerator',
      'Amazon CloudFront',
      'ALB with cross-region load balancing',
    ],
    a: 1,
    exp: 'AWS Global Accelerator provides two static Anycast IP addresses that direct traffic to the nearest AWS edge location and then over the AWS global network to the closest healthy endpoint. Route 53 latency routing uses DNS-based routing with TTL delays; CloudFront is a CDN optimized for cacheable content; ALB does not operate at the global network level with Anycast IPs.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A CloudFront distribution serves content from an S3 bucket. The security team wants to ensure S3 content is only accessible through CloudFront and not directly from S3. What should be configured?',
    opts: [
      'S3 bucket policy allowing public access',
      'CloudFront Origin Access Control (OAC) and a restrictive S3 bucket policy',
      'CloudFront signed URLs only',
      'S3 Transfer Acceleration with CloudFront',
    ],
    a: 1,
    exp: 'Origin Access Control (OAC, the successor to OAI) allows CloudFront to sign requests to S3 using SigV4, and a bucket policy that allows only the CloudFront service principal prevents direct S3 access. Making the bucket publicly accessible defeats the purpose; signed URLs control who can access content but do not prevent direct S3 access; Transfer Acceleration speeds up uploads to S3.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'An ALB needs to route requests for /api/* to a target group of API servers and all other requests to a target group of web servers. Which ALB feature enables this?',
    opts: [
      'Host-based routing',
      'Path-based routing rules',
      'ALB weighted target groups',
      'NLB TCP routing',
    ],
    a: 1,
    exp: 'ALB listener rules support path conditions (e.g., /api/*) to forward matching requests to a specific target group. Host-based routing routes based on the Host header (e.g., api.example.com vs www.example.com); weighted target groups split traffic by percentage; NLB operates at layer 4 and does not inspect HTTP paths.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'An application requires source IP preservation for TCP connections so that backend servers can log the actual client IP. The load balancer must handle millions of concurrent connections. Which load balancer type is appropriate?',
    opts: [
      'Application Load Balancer',
      'Network Load Balancer',
      'Classic Load Balancer',
      'Gateway Load Balancer',
    ],
    a: 1,
    exp: 'The Network Load Balancer (NLB) operates at layer 4, preserves the client source IP by default for TCP/UDP traffic, and is designed for ultra-high performance with millions of concurrent connections. ALB operates at layer 7 and uses X-Forwarded-For for the client IP; Classic Load Balancer is legacy; Gateway Load Balancer is for third-party virtual appliances.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'Route 53 is configured with weighted routing: Record A (weight 80) points to us-east-1 and Record B (weight 20) points to eu-west-1. What percentage of queries will be sent to eu-west-1?',
    opts: [
      '20%',
      '80%',
      '50%',
      '10%',
    ],
    a: 0,
    exp: 'Route 53 weighted routing distributes traffic proportionally to the weights. Total weight = 100. Record B weight = 20, so 20/100 = 20% of queries go to eu-west-1. Record A receives 80/100 = 80%.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A company wants to restrict access to a CloudFront distribution so that only users from the United States and Canada can view the content. All other users should receive a 403 response. Which CloudFront feature handles this?',
    opts: [
      'CloudFront signed cookies',
      'CloudFront geographic restrictions (geo-blocking)',
      'AWS WAF geo-match rule attached to the distribution',
      'Route 53 geolocation routing',
    ],
    a: 1,
    exp: 'CloudFront\'s built-in geographic restrictions (allow list or deny list) block requests from specified countries at the edge, returning a 403. Signed cookies control access for authenticated users regardless of location; WAF geo-match rules also work but are an additional cost and complexity; Route 53 geolocation routing directs DNS queries but does not enforce access at the CDN edge.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A SysOps engineer is troubleshooting intermittent connectivity issues between instances in two peered VPCs. Traffic from VPC-A to VPC-B works, but the reverse path fails. What is the most common cause?',
    opts: [
      'The peering connection is not fully established',
      'The return route for VPC-A\'s CIDR is missing from VPC-B\'s route tables',
      'VPC peering does not support bidirectional traffic',
      'The security groups in VPC-A block all inbound traffic',
    ],
    a: 1,
    exp: 'VPC peering requires routes to be added in both the source and destination route tables. If the route for VPC-A\'s CIDR is missing from VPC-B\'s route table, traffic from B to A will have no return path and will fail. VPC peering is fully bidirectional; the connection being active does not guarantee route table configuration; security groups would cause issues on both directions if misconfigured.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'An application behind a CloudFront distribution requires users to authenticate before accessing premium video content. The authentication token should persist across multiple requests without requiring URL signing on every request. Which CloudFront feature is best suited?',
    opts: [
      'CloudFront signed URLs',
      'CloudFront signed cookies',
      'CloudFront origin access control',
      'Lambda@Edge for authentication',
    ],
    a: 1,
    exp: 'CloudFront signed cookies are ideal when you want to provide access to multiple restricted files (e.g., all videos in a membership) without changing URLs. The cookie is set once and sent automatically with subsequent requests. Signed URLs restrict access to individual files; OAC controls CloudFront-to-origin authentication; Lambda@Edge can implement custom auth but is more complex for this use case.',
  },

  // ── Cost & Performance Optimization (~8 questions) ────────────────────────
  {
    domain: 'Cost & Performance Optimization',
    q: 'A SysOps engineer notices that several EC2 instances are consistently running at less than 10% CPU utilization. Which AWS service provides rightsizing recommendations for these instances?',
    opts: [
      'AWS Cost Explorer',
      'AWS Compute Optimizer',
      'AWS Trusted Advisor',
      'Amazon CloudWatch',
    ],
    a: 1,
    exp: 'AWS Compute Optimizer analyzes CloudWatch metrics and uses machine learning to recommend optimal EC2 instance types, EBS volume configurations, and Lambda memory settings. Cost Explorer provides cost analysis and some rightsizing recommendations but is less granular. Trusted Advisor has a basic underutilized EC2 check; CloudWatch collects the metrics but does not generate rightsizing recommendations.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'A company is running a batch job on 500 EC2 instances. The job can tolerate interruptions and restart from a checkpoint. Which EC2 purchasing option minimizes cost?',
    opts: [
      'On-Demand Instances',
      'Reserved Instances (1-year, No Upfront)',
      'EC2 Spot Instances',
      'Dedicated Hosts',
    ],
    a: 2,
    exp: 'EC2 Spot Instances offer up to 90% discount over On-Demand pricing and are ideal for fault-tolerant, interruptible workloads that can checkpoint and resume. On-Demand is the most expensive for sustained use; Reserved Instances require commitment and suit steady-state workloads; Dedicated Hosts are for licensing or compliance requirements and are more expensive.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'An EC2 Spot Instance receives a two-minute interruption notice. The application needs to save its state before termination. How should the application handle this?',
    opts: [
      'Poll the EC2 instance metadata service for the termination notice and trigger a checkpoint',
      'Configure an Auto Scaling lifecycle hook for Spot interruptions',
      'Use an SNS topic to receive the interruption event',
      'Attach an additional EBS volume for automatic state preservation',
    ],
    a: 0,
    exp: 'EC2 publishes a Spot interruption notice to the instance metadata service (IMDS) at http://169.254.169.254/latest/meta-data/spot/termination-time two minutes before termination. Applications should poll this endpoint and trigger a checkpoint when the notice appears. Lifecycle hooks apply to Auto Scaling termination events, not Spot interruptions; SNS is not the delivery mechanism for instance-level interruption notices.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'A company stores infrequently accessed S3 objects and wants to minimize storage costs without manually moving objects between storage classes. Which S3 storage class achieves this automatically?',
    opts: [
      'S3 Standard-IA',
      'S3 One Zone-IA',
      'S3 Intelligent-Tiering',
      'S3 Glacier Instant Retrieval',
    ],
    a: 2,
    exp: 'S3 Intelligent-Tiering monitors access patterns and automatically moves objects between frequent-access and infrequent-access tiers (and optional archive tiers) without operational overhead or retrieval charges. Standard-IA and One Zone-IA require manually setting the class; Glacier Instant Retrieval is for archival data with occasional retrieval needs.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'An application on EC2 writes large sequential data to an EBS volume and is experiencing slow throughput. The volume is gp2 and is 500 GB. What is the most cost-effective way to improve throughput?',
    opts: [
      'Increase the gp2 volume size to the maximum 16 TB',
      'Migrate to an io2 Provisioned IOPS volume',
      'Migrate to a st1 (Throughput Optimized HDD) volume',
      'Attach a second gp2 volume and stripe them',
    ],
    a: 2,
    exp: 'st1 (Throughput Optimized HDD) volumes are designed for large, sequential workloads like big data, data warehouses, and log processing, offering up to 500 MB/s throughput at a lower cost than SSD-based volumes. io2 provides high IOPS but is more expensive and suited for random I/O; gp2 scales IOPS with size but throughput is capped; striping adds complexity.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'A company wants to identify unused EC2 instances, idle load balancers, and underutilized EBS volumes across all accounts. Which AWS service provides these checks with no additional configuration?',
    opts: [
      'AWS Cost Explorer',
      'AWS Trusted Advisor',
      'AWS Compute Optimizer',
      'Amazon CloudWatch',
    ],
    a: 1,
    exp: 'AWS Trusted Advisor provides automated best-practice checks including underutilized EC2 instances, idle load balancers, and underutilized EBS volumes out of the box (with Business or Enterprise Support for the full check set). Cost Explorer analyzes spending trends; Compute Optimizer focuses on instance type rightsizing; CloudWatch provides metrics but not automated optimization checks.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'A SysOps engineer needs to analyze monthly AWS spend by service and by team tag over the past six months to identify cost anomalies. Which tool is most appropriate?',
    opts: [
      'AWS Billing Dashboard',
      'AWS Cost Explorer with filtering by tag and service',
      'AWS Compute Optimizer',
      'AWS Trusted Advisor cost checks',
    ],
    a: 1,
    exp: 'Cost Explorer allows you to visualize, filter, and group AWS costs by service, account, tag, region, and other dimensions with up to 12 months of historical data. The Billing Dashboard shows current charges at a high level; Compute Optimizer focuses on resource configuration; Trusted Advisor cost checks identify specific waste patterns but do not provide the filtering and trending analysis of Cost Explorer.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'An RDS MySQL instance is running out of storage during peak load, causing the application to fail. The team wants to prevent this without manual intervention. Which feature should they enable?',
    opts: [
      'RDS Multi-AZ',
      'RDS storage autoscaling',
      'RDS Read Replica for write offloading',
      'Increase allocated storage manually every quarter',
    ],
    a: 1,
    exp: 'RDS storage autoscaling automatically increases the allocated storage when free space falls below a threshold, preventing storage-related failures without manual intervention. Multi-AZ provides high availability but does not address storage capacity; read replicas offload reads, not writes; manual quarterly increases are reactive and may not respond fast enough to sudden growth.',
  },

  // ── Additional questions to reach 70+ total ───────────────────────────────
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A SysOps engineer needs to monitor memory utilization on EC2 instances. The default CloudWatch metrics do not include memory. What must they do?',
    opts: [
      'Enable enhanced monitoring on the EC2 instance',
      'Install and configure the CloudWatch Agent to collect memory metrics',
      'Use AWS X-Ray to trace memory consumption',
      'Enable detailed monitoring on the EC2 instance',
    ],
    a: 1,
    exp: 'Memory utilization is a guest OS metric that requires the CloudWatch Agent to collect and publish to CloudWatch. Enhanced monitoring is an RDS feature; AWS X-Ray traces distributed applications, not OS-level metrics; detailed monitoring increases the EC2 metric resolution from 5 minutes to 1 minute but does not add new metric types like memory.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A company needs its RDS PostgreSQL database to scale read traffic across multiple copies of the data. The primary instance handles all writes. What should they create?',
    opts: [
      'RDS Multi-AZ standby',
      'RDS Read Replicas',
      'Aurora Global Database',
      'DynamoDB global tables',
    ],
    a: 1,
    exp: 'RDS Read Replicas use asynchronous replication to maintain read-only copies of the database, allowing read traffic to be distributed across replicas. Multi-AZ standby is synchronous and is used for failover, not read scaling; Aurora Global Database is for multi-region low-latency reads; DynamoDB global tables apply to DynamoDB, not RDS.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A SysOps engineer needs to ensure that newly created IAM users are automatically added to a group that enforces MFA. Which approach enforces this at the organization level with least overhead?',
    opts: [
      'Train administrators to add users to the MFA group manually',
      'Use an EventBridge rule triggering a Lambda function to add new IAM users to the MFA-enforced group',
      'Apply an SCP that denies all actions if MFA is not present',
      'Use AWS Config to detect users without MFA and send alerts',
    ],
    a: 1,
    exp: 'An EventBridge rule matching the CreateUser API event can trigger a Lambda that automatically adds the new user to the MFA-enforced group, removing manual overhead. An SCP denying actions without MFA is a strong enforcement mechanism but does not enroll users in the group. Config detects non-compliance after the fact. Manual processes are unreliable.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A CloudFormation stack is stuck in DELETE_FAILED state because an S3 bucket in the stack is not empty. How should the engineer resolve this?',
    opts: [
      'Re-run the delete operation and CloudFormation will eventually succeed',
      'Manually empty the S3 bucket and then retry the CloudFormation stack deletion',
      'Use CloudFormation drift detection to fix the bucket',
      'Add a DeletionPolicy of Delete to the S3 bucket resource and redeploy',
    ],
    a: 1,
    exp: 'CloudFormation cannot delete a non-empty S3 bucket. The engineer must manually empty (or use S3 Batch Operations to delete all objects) the bucket and then retry the stack deletion. Retrying without emptying the bucket will fail again; drift detection identifies configuration differences; modifying the template requires a stack update, which is not possible on a failed-delete stack.',
  },
  {
    domain: 'Networking & Content Delivery',
    q: 'A SysOps engineer is setting up a VPN connection between an on-premises firewall and an AWS Virtual Private Gateway. The VPN comes up but traffic is not flowing. What should they check first?',
    opts: [
      'Whether the VPC has an internet gateway',
      'Whether the route tables in the VPC include the on-premises CIDR with the Virtual Private Gateway as the target',
      'Whether the EC2 instances have public IP addresses',
      'Whether CloudTrail is enabled',
    ],
    a: 1,
    exp: 'Even when the VPN tunnel is established, traffic will not flow if the VPC route tables do not have a route for the on-premises CIDR pointing to the Virtual Private Gateway. An internet gateway is not required for private VPN connectivity; public IPs are not needed for private traffic; CloudTrail is for auditing and does not affect routing.',
  },
  {
    domain: 'Cost & Performance Optimization',
    q: 'An application uses gp3 EBS volumes and is experiencing latency spikes during peak I/O. The volume is 1 TB and is using the baseline 3,000 IOPS. What is the most targeted fix?',
    opts: [
      'Migrate to st1 HDD volumes for lower latency',
      'Increase the provisioned IOPS on the gp3 volume up to 16,000 IOPS independently of size',
      'Create an EBS snapshot and restore to a larger volume',
      'Enable EBS Multi-Attach',
    ],
    a: 1,
    exp: 'gp3 allows independent provisioning of IOPS (up to 16,000) and throughput regardless of volume size, making it straightforward to increase performance without resizing. st1 HDD volumes have higher latency than SSD; resizing the volume increases gp2 IOPS proportionally but gp3 allows direct IOPS provisioning; EBS Multi-Attach allows multiple instances to share a volume, which does not address single-volume IOPS.',
  },
  {
    domain: 'Monitoring Logging & Remediation',
    q: 'A team needs to receive a Slack notification whenever a CloudWatch alarm transitions to ALARM state. What is the simplest architecture?',
    opts: [
      'CloudWatch Alarm → SQS → Lambda → Slack webhook',
      'CloudWatch Alarm → SNS topic → Lambda (posts to Slack webhook)',
      'CloudWatch Alarm → EventBridge → Kinesis → Slack',
      'CloudWatch Alarm → CloudTrail → Lambda → Slack',
    ],
    a: 1,
    exp: 'The standard pattern is: CloudWatch Alarm publishes to an SNS topic when it enters ALARM state; the SNS topic triggers a Lambda function that calls the Slack incoming webhook. The SQS path adds unnecessary complexity; Kinesis is for streaming data pipelines; CloudTrail records API events and is not triggered by alarm state changes.',
  },
  {
    domain: 'Security & Compliance',
    q: 'A company suspects that an EC2 instance has been compromised. The security team wants to collect volatile forensic evidence without affecting the production environment. What should they do first?',
    opts: [
      'Terminate the instance immediately',
      'Create an EBS snapshot of the instance volumes and take a memory dump before isolation',
      'Run AWS Inspector on the instance',
      'Review the CloudTrail event history for the instance',
    ],
    a: 1,
    exp: 'Forensic best practice is to preserve volatile and non-volatile evidence: isolate the instance (change security group to deny all traffic), create an EBS snapshot for disk forensics, and capture a memory dump if possible before termination. Terminating immediately destroys evidence; Inspector scans for vulnerabilities but does not collect forensic artifacts; CloudTrail shows API calls but not in-memory state.',
  },
  {
    domain: 'Deployment Provisioning & Automation',
    q: 'A SysOps engineer wants to use Session Manager to connect to EC2 instances without opening SSH port 22. Which prerequisites are required?',
    opts: [
      'The instance must have a public IP and SSH key pair',
      'The instance must have the SSM Agent installed and an IAM instance profile with AmazonSSMManagedInstanceCore policy',
      'The instance must be in a public subnet with internet access',
      'Session Manager requires AWS Direct Connect',
    ],
    a: 1,
    exp: 'Session Manager requires the SSM Agent to be running on the instance and an IAM instance profile that includes the AmazonSSMManagedInstanceCore policy so the instance can communicate with the SSM service. No public IP, SSH key, or specific subnet is needed (though the instance needs network access to SSM endpoints via internet or VPC endpoints). Direct Connect is not required.',
  },
  {
    domain: 'Reliability & Business Continuity',
    q: 'A company uses AWS Backup to centrally manage EBS, RDS, and DynamoDB backups. A compliance audit requires proof that backups were completed successfully every day for the past 90 days. Where can this evidence be found?',
    opts: [
      'AWS CloudTrail event history filtered on CreateBackup',
      'AWS Backup job history in the AWS Backup console or via the ListBackupJobs API',
      'Amazon CloudWatch Logs if backup events are streamed',
      'AWS Config configuration timeline for the resources',
    ],
    a: 1,
    exp: 'AWS Backup maintains a job history (backup, restore, copy jobs) accessible in the console and via API/CLI, showing status, start/end time, and resource for each job. CloudTrail records the API calls that initiated backups but does not aggregate job status over time as cleanly; CloudWatch Logs may capture some events if configured; Config tracks resource configuration, not backup job completions.',
  },

  // ── Additional SOA-C02 practice questions (50 added) ──

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "A multinational enterprise is preparing for AWS Certified SysOps Administrator – Associate and must strengthen Monitoring Logging & Remediation. Which option is BEST?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned monitoring logging & remediation approach recommended in official exam objectives",
      "Skip monitoring logging & remediation testing before production rollout",
      "Implement monitoring logging & remediation without change management or rollback plans",
      "Use default monitoring logging & remediation settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned monitoring logging & remediation approach recommended in official exam objectives. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "During a AWS Certified SysOps Administrator – Associate readiness review at a regulated financial institution, which Reliability & Business Continuity approach meets certification objectives?",
    opts: [
      "Implement reliability & business continuity without change management or rollback plans",
      "Follow industry best practices for reliability & business continuity as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Use default reliability & business continuity settings without hardening",
      "Centralize all reliability & business continuity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for reliability & business continuity as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "A consultant advising a healthcare organization on AWS Certified SysOps Administrator – Associate recommends improvements to Deployment Provisioning & Automation. What should they implement?",
    opts: [
      "Use default deployment provisioning & automation settings without hardening",
      "Centralize all deployment provisioning & automation decisions without stakeholder review",
      "Implement the standard deployment provisioning & automation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements",
      "Deprecate deployment provisioning & automation controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard deployment provisioning & automation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "Which Security & Compliance strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified SysOps Administrator – Associate standards?",
    opts: [
      "Centralize all security & compliance decisions without stakeholder review",
      "Deprecate security & compliance controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security & compliance policies",
      "Use the certified security & compliance methodology specified for AWS Certified SysOps Administrator – Associate candidates",
    ],
    a: 3,
    exp: "Use the certified security & compliance methodology specified for AWS Certified SysOps Administrator – Associate candidates. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "An audit of a government agency reveals gaps in Networking & Content Delivery for AWS Certified SysOps Administrator – Associate. Which remediation is CORRECT?",
    opts: [
      "Adopt the networking & content delivery control framework referenced in AWS Certified SysOps Administrator – Associate study materials",
      "Deprecate networking & content delivery controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses networking & content delivery policies",
      "Disable monitoring for networking & content delivery to improve performance",
    ],
    a: 0,
    exp: "Adopt the networking & content delivery control framework referenced in AWS Certified SysOps Administrator – Associate study materials. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified SysOps Administrator – Associate study plan focused on Cost & Performance Optimization. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses cost & performance optimization policies",
      "Configure cost & performance optimization according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations",
      "Disable monitoring for cost & performance optimization to improve performance",
      "Grant excessive privileges that violate cost & performance optimization least-privilege principles",
    ],
    a: 1,
    exp: "Configure cost & performance optimization according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "When a manufacturing company modernizing IT implements AWS Certified SysOps Administrator – Associate controls for Monitoring Logging & Remediation, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for monitoring logging & remediation to improve performance",
      "Grant excessive privileges that violate monitoring logging & remediation least-privilege principles",
      "Select the monitoring logging & remediation option that meets AWS Certified SysOps Administrator – Associate security and governance standards",
      "Rely solely on manual processes with no monitoring logging & remediation automation",
    ],
    a: 2,
    exp: "Select the monitoring logging & remediation option that meets AWS Certified SysOps Administrator – Associate security and governance standards. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "A AWS Certified SysOps Administrator – Associate practice exam scenario covers Reliability & Business Continuity for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate reliability & business continuity least-privilege principles",
      "Rely solely on manual processes with no reliability & business continuity automation",
      "Ignore reliability & business continuity compliance requirements for faster deployment",
      "Design reliability & business continuity using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments",
    ],
    a: 3,
    exp: "Design reliability & business continuity using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "Which Deployment Provisioning & Automation principle is emphasized in AWS Certified SysOps Administrator – Associate when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned deployment provisioning & automation approach recommended in official exam objectives",
      "Rely solely on manual processes with no deployment provisioning & automation automation",
      "Ignore deployment provisioning & automation compliance requirements for faster deployment",
      "Mix production and test deployment provisioning & automation configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned deployment provisioning & automation approach recommended in official exam objectives. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "A regulated financial institution failed a mock AWS Certified SysOps Administrator – Associate question on Security & Compliance. What concept should they review?",
    opts: [
      "Ignore security & compliance compliance requirements for faster deployment",
      "Follow industry best practices for security & compliance as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Mix production and test security & compliance configurations in one environment",
      "Store sensitive security & compliance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for security & compliance as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "For AWS Certified SysOps Administrator – Associate certification, Networking & Content Delivery knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test networking & content delivery configurations in one environment",
      "Store sensitive networking & content delivery credentials in plain text configuration files",
      "Implement the standard networking & content delivery solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements",
      "Skip networking & content delivery testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard networking & content delivery solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "A team at a high-traffic e-commerce platform debates Cost & Performance Optimization options while studying AWS Certified SysOps Administrator – Associate. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive cost & performance optimization credentials in plain text configuration files",
      "Skip cost & performance optimization testing before production rollout",
      "Implement cost & performance optimization without change management or rollback plans",
      "Use the certified cost & performance optimization methodology specified for AWS Certified SysOps Administrator – Associate candidates",
    ],
    a: 3,
    exp: "Use the certified cost & performance optimization methodology specified for AWS Certified SysOps Administrator – Associate candidates. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "Which Monitoring Logging & Remediation capability is validated by AWS Certified SysOps Administrator – Associate for organizations such as a government agency?",
    opts: [
      "Adopt the monitoring logging & remediation control framework referenced in AWS Certified SysOps Administrator – Associate study materials",
      "Skip monitoring logging & remediation testing before production rollout",
      "Implement monitoring logging & remediation without change management or rollback plans",
      "Use default monitoring logging & remediation settings without hardening",
    ],
    a: 0,
    exp: "Adopt the monitoring logging & remediation control framework referenced in AWS Certified SysOps Administrator – Associate study materials. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "When evaluating Reliability & Business Continuity tools for AWS Certified SysOps Administrator – Associate, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement reliability & business continuity without change management or rollback plans",
      "Configure reliability & business continuity according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations",
      "Use default reliability & business continuity settings without hardening",
      "Centralize all reliability & business continuity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure reliability & business continuity according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "A manufacturing company modernizing IT must document Deployment Provisioning & Automation procedures for AWS Certified SysOps Administrator – Associate compliance. Which standard applies?",
    opts: [
      "Use default deployment provisioning & automation settings without hardening",
      "Centralize all deployment provisioning & automation decisions without stakeholder review",
      "Select the deployment provisioning & automation option that meets AWS Certified SysOps Administrator – Associate security and governance standards",
      "Deprecate deployment provisioning & automation controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the deployment provisioning & automation option that meets AWS Certified SysOps Administrator – Associate security and governance standards. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "A AWS Certified SysOps Administrator – Associate instructor asks about Security & Compliance in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all security & compliance decisions without stakeholder review",
      "Deprecate security & compliance controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security & compliance policies",
      "Design security & compliance using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments",
    ],
    a: 3,
    exp: "Design security & compliance using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "Which Networking & Content Delivery metric best indicates AWS Certified SysOps Administrator – Associate readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned networking & content delivery approach recommended in official exam objectives",
      "Deprecate networking & content delivery controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses networking & content delivery policies",
      "Disable monitoring for networking & content delivery to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned networking & content delivery approach recommended in official exam objectives. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "A regulated financial institution is troubleshooting a Cost & Performance Optimization issue while preparing for AWS Certified SysOps Administrator – Associate. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses cost & performance optimization policies",
      "Follow industry best practices for cost & performance optimization as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Disable monitoring for cost & performance optimization to improve performance",
      "Grant excessive privileges that violate cost & performance optimization least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for cost & performance optimization as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "In AWS Certified SysOps Administrator – Associate, how should a healthcare organization handle a trade-off involving Monitoring Logging & Remediation?",
    opts: [
      "Disable monitoring for monitoring logging & remediation to improve performance",
      "Grant excessive privileges that violate monitoring logging & remediation least-privilege principles",
      "Implement the standard monitoring logging & remediation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements",
      "Rely solely on manual processes with no monitoring logging & remediation automation",
    ],
    a: 2,
    exp: "Implement the standard monitoring logging & remediation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "Which Reliability & Business Continuity pattern is commonly tested on AWS Certified SysOps Administrator – Associate for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate reliability & business continuity least-privilege principles",
      "Rely solely on manual processes with no reliability & business continuity automation",
      "Ignore reliability & business continuity compliance requirements for faster deployment",
      "Use the certified reliability & business continuity methodology specified for AWS Certified SysOps Administrator – Associate candidates",
    ],
    a: 3,
    exp: "Use the certified reliability & business continuity methodology specified for AWS Certified SysOps Administrator – Associate candidates. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "A government agency is preparing for AWS Certified SysOps Administrator – Associate and must strengthen Deployment Provisioning & Automation. Which option is BEST?",
    opts: [
      "Adopt the deployment provisioning & automation control framework referenced in AWS Certified SysOps Administrator – Associate study materials",
      "Rely solely on manual processes with no deployment provisioning & automation automation",
      "Ignore deployment provisioning & automation compliance requirements for faster deployment",
      "Mix production and test deployment provisioning & automation configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the deployment provisioning & automation control framework referenced in AWS Certified SysOps Administrator – Associate study materials. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "During a AWS Certified SysOps Administrator – Associate readiness review at a SaaS startup scaling rapidly, which Security & Compliance approach meets certification objectives?",
    opts: [
      "Ignore security & compliance compliance requirements for faster deployment",
      "Configure security & compliance according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations",
      "Mix production and test security & compliance configurations in one environment",
      "Store sensitive security & compliance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure security & compliance according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified SysOps Administrator – Associate recommends improvements to Networking & Content Delivery. What should they implement?",
    opts: [
      "Mix production and test networking & content delivery configurations in one environment",
      "Store sensitive networking & content delivery credentials in plain text configuration files",
      "Select the networking & content delivery option that meets AWS Certified SysOps Administrator – Associate security and governance standards",
      "Skip networking & content delivery testing before production rollout",
    ],
    a: 2,
    exp: "Select the networking & content delivery option that meets AWS Certified SysOps Administrator – Associate security and governance standards. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "Which Cost & Performance Optimization strategy is MOST appropriate when a media company with global users adopts AWS Certified SysOps Administrator – Associate standards?",
    opts: [
      "Store sensitive cost & performance optimization credentials in plain text configuration files",
      "Skip cost & performance optimization testing before production rollout",
      "Implement cost & performance optimization without change management or rollback plans",
      "Design cost & performance optimization using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments",
    ],
    a: 3,
    exp: "Design cost & performance optimization using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "An audit of a multinational enterprise reveals gaps in Monitoring Logging & Remediation for AWS Certified SysOps Administrator – Associate. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned monitoring logging & remediation approach recommended in official exam objectives",
      "Skip monitoring logging & remediation testing before production rollout",
      "Implement monitoring logging & remediation without change management or rollback plans",
      "Use default monitoring logging & remediation settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned monitoring logging & remediation approach recommended in official exam objectives. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "A regulated financial institution is designing a AWS Certified SysOps Administrator – Associate study plan focused on Reliability & Business Continuity. Which resource topic is essential?",
    opts: [
      "Implement reliability & business continuity without change management or rollback plans",
      "Follow industry best practices for reliability & business continuity as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Use default reliability & business continuity settings without hardening",
      "Centralize all reliability & business continuity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for reliability & business continuity as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "When a healthcare organization implements AWS Certified SysOps Administrator – Associate controls for Deployment Provisioning & Automation, which practice reduces operational risk?",
    opts: [
      "Use default deployment provisioning & automation settings without hardening",
      "Centralize all deployment provisioning & automation decisions without stakeholder review",
      "Implement the standard deployment provisioning & automation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements",
      "Deprecate deployment provisioning & automation controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard deployment provisioning & automation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "A AWS Certified SysOps Administrator – Associate practice exam scenario covers Security & Compliance for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Centralize all security & compliance decisions without stakeholder review",
      "Deprecate security & compliance controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security & compliance policies",
      "Use the certified security & compliance methodology specified for AWS Certified SysOps Administrator – Associate candidates",
    ],
    a: 3,
    exp: "Use the certified security & compliance methodology specified for AWS Certified SysOps Administrator – Associate candidates. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "Which Networking & Content Delivery principle is emphasized in AWS Certified SysOps Administrator – Associate when supporting a government agency?",
    opts: [
      "Adopt the networking & content delivery control framework referenced in AWS Certified SysOps Administrator – Associate study materials",
      "Deprecate networking & content delivery controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses networking & content delivery policies",
      "Disable monitoring for networking & content delivery to improve performance",
    ],
    a: 0,
    exp: "Adopt the networking & content delivery control framework referenced in AWS Certified SysOps Administrator – Associate study materials. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified SysOps Administrator – Associate question on Cost & Performance Optimization. What concept should they review?",
    opts: [
      "Use an undocumented workaround that bypasses cost & performance optimization policies",
      "Configure cost & performance optimization according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations",
      "Disable monitoring for cost & performance optimization to improve performance",
      "Grant excessive privileges that violate cost & performance optimization least-privilege principles",
    ],
    a: 1,
    exp: "Configure cost & performance optimization according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "For AWS Certified SysOps Administrator – Associate certification, Monitoring Logging & Remediation knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Disable monitoring for monitoring logging & remediation to improve performance",
      "Grant excessive privileges that violate monitoring logging & remediation least-privilege principles",
      "Select the monitoring logging & remediation option that meets AWS Certified SysOps Administrator – Associate security and governance standards",
      "Rely solely on manual processes with no monitoring logging & remediation automation",
    ],
    a: 2,
    exp: "Select the monitoring logging & remediation option that meets AWS Certified SysOps Administrator – Associate security and governance standards. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "A team at a media company with global users debates Reliability & Business Continuity options while studying AWS Certified SysOps Administrator – Associate. Which choice aligns with the exam guide?",
    opts: [
      "Grant excessive privileges that violate reliability & business continuity least-privilege principles",
      "Rely solely on manual processes with no reliability & business continuity automation",
      "Ignore reliability & business continuity compliance requirements for faster deployment",
      "Design reliability & business continuity using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments",
    ],
    a: 3,
    exp: "Design reliability & business continuity using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "Which Deployment Provisioning & Automation capability is validated by AWS Certified SysOps Administrator – Associate for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned deployment provisioning & automation approach recommended in official exam objectives",
      "Rely solely on manual processes with no deployment provisioning & automation automation",
      "Ignore deployment provisioning & automation compliance requirements for faster deployment",
      "Mix production and test deployment provisioning & automation configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned deployment provisioning & automation approach recommended in official exam objectives. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "When evaluating Security & Compliance tools for AWS Certified SysOps Administrator – Associate, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Ignore security & compliance compliance requirements for faster deployment",
      "Follow industry best practices for security & compliance as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Mix production and test security & compliance configurations in one environment",
      "Store sensitive security & compliance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for security & compliance as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "A healthcare organization must document Networking & Content Delivery procedures for AWS Certified SysOps Administrator – Associate compliance. Which standard applies?",
    opts: [
      "Mix production and test networking & content delivery configurations in one environment",
      "Store sensitive networking & content delivery credentials in plain text configuration files",
      "Implement the standard networking & content delivery solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements",
      "Skip networking & content delivery testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard networking & content delivery solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "A AWS Certified SysOps Administrator – Associate instructor asks about Cost & Performance Optimization in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Store sensitive cost & performance optimization credentials in plain text configuration files",
      "Skip cost & performance optimization testing before production rollout",
      "Implement cost & performance optimization without change management or rollback plans",
      "Use the certified cost & performance optimization methodology specified for AWS Certified SysOps Administrator – Associate candidates",
    ],
    a: 3,
    exp: "Use the certified cost & performance optimization methodology specified for AWS Certified SysOps Administrator – Associate candidates. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "Which Monitoring Logging & Remediation metric best indicates AWS Certified SysOps Administrator – Associate readiness for a government agency?",
    opts: [
      "Adopt the monitoring logging & remediation control framework referenced in AWS Certified SysOps Administrator – Associate study materials",
      "Skip monitoring logging & remediation testing before production rollout",
      "Implement monitoring logging & remediation without change management or rollback plans",
      "Use default monitoring logging & remediation settings without hardening",
    ],
    a: 0,
    exp: "Adopt the monitoring logging & remediation control framework referenced in AWS Certified SysOps Administrator – Associate study materials. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "A SaaS startup scaling rapidly is troubleshooting a Reliability & Business Continuity issue while preparing for AWS Certified SysOps Administrator – Associate. What is the first step?",
    opts: [
      "Implement reliability & business continuity without change management or rollback plans",
      "Configure reliability & business continuity according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations",
      "Use default reliability & business continuity settings without hardening",
      "Centralize all reliability & business continuity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure reliability & business continuity according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "In AWS Certified SysOps Administrator – Associate, how should a manufacturing company modernizing IT handle a trade-off involving Deployment Provisioning & Automation?",
    opts: [
      "Use default deployment provisioning & automation settings without hardening",
      "Centralize all deployment provisioning & automation decisions without stakeholder review",
      "Select the deployment provisioning & automation option that meets AWS Certified SysOps Administrator – Associate security and governance standards",
      "Deprecate deployment provisioning & automation controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the deployment provisioning & automation option that meets AWS Certified SysOps Administrator – Associate security and governance standards. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "Which Security & Compliance pattern is commonly tested on AWS Certified SysOps Administrator – Associate for scenarios involving a media company with global users?",
    opts: [
      "Centralize all security & compliance decisions without stakeholder review",
      "Deprecate security & compliance controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security & compliance policies",
      "Design security & compliance using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments",
    ],
    a: 3,
    exp: "Design security & compliance using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "A multinational enterprise is preparing for AWS Certified SysOps Administrator – Associate and must strengthen Networking & Content Delivery. Which option is BEST?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned networking & content delivery approach recommended in official exam objectives",
      "Deprecate networking & content delivery controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses networking & content delivery policies",
      "Disable monitoring for networking & content delivery to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned networking & content delivery approach recommended in official exam objectives. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "During a AWS Certified SysOps Administrator – Associate readiness review at a regulated financial institution, which Cost & Performance Optimization approach meets certification objectives?",
    opts: [
      "Use an undocumented workaround that bypasses cost & performance optimization policies",
      "Follow industry best practices for cost & performance optimization as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Disable monitoring for cost & performance optimization to improve performance",
      "Grant excessive privileges that violate cost & performance optimization least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for cost & performance optimization as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "A consultant advising a healthcare organization on AWS Certified SysOps Administrator – Associate recommends improvements to Monitoring Logging & Remediation. What should they implement?",
    opts: [
      "Disable monitoring for monitoring logging & remediation to improve performance",
      "Grant excessive privileges that violate monitoring logging & remediation least-privilege principles",
      "Implement the standard monitoring logging & remediation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements",
      "Rely solely on manual processes with no monitoring logging & remediation automation",
    ],
    a: 2,
    exp: "Implement the standard monitoring logging & remediation solution that satisfies AWS Certified SysOps Administrator – Associate domain requirements. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "Which Reliability & Business Continuity strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified SysOps Administrator – Associate standards?",
    opts: [
      "Grant excessive privileges that violate reliability & business continuity least-privilege principles",
      "Rely solely on manual processes with no reliability & business continuity automation",
      "Ignore reliability & business continuity compliance requirements for faster deployment",
      "Use the certified reliability & business continuity methodology specified for AWS Certified SysOps Administrator – Associate candidates",
    ],
    a: 3,
    exp: "Use the certified reliability & business continuity methodology specified for AWS Certified SysOps Administrator – Associate candidates. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Deployment Provisioning & Automation ──
  {
    domain: "Deployment Provisioning & Automation",
    q: "An audit of a government agency reveals gaps in Deployment Provisioning & Automation for AWS Certified SysOps Administrator – Associate. Which remediation is CORRECT?",
    opts: [
      "Adopt the deployment provisioning & automation control framework referenced in AWS Certified SysOps Administrator – Associate study materials",
      "Rely solely on manual processes with no deployment provisioning & automation automation",
      "Ignore deployment provisioning & automation compliance requirements for faster deployment",
      "Mix production and test deployment provisioning & automation configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the deployment provisioning & automation control framework referenced in AWS Certified SysOps Administrator – Associate study materials. This is the recommended approach for the Deployment Provisioning & Automation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Security & Compliance ──
  {
    domain: "Security & Compliance",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified SysOps Administrator – Associate study plan focused on Security & Compliance. Which resource topic is essential?",
    opts: [
      "Ignore security & compliance compliance requirements for faster deployment",
      "Configure security & compliance according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations",
      "Mix production and test security & compliance configurations in one environment",
      "Store sensitive security & compliance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure security & compliance according to AWS Certified SysOps Administrator – Associate exam blueprint recommendations. This is the recommended approach for the Security & Compliance domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Networking & Content Delivery ──
  {
    domain: "Networking & Content Delivery",
    q: "When a manufacturing company modernizing IT implements AWS Certified SysOps Administrator – Associate controls for Networking & Content Delivery, which practice reduces operational risk?",
    opts: [
      "Mix production and test networking & content delivery configurations in one environment",
      "Store sensitive networking & content delivery credentials in plain text configuration files",
      "Select the networking & content delivery option that meets AWS Certified SysOps Administrator – Associate security and governance standards",
      "Skip networking & content delivery testing before production rollout",
    ],
    a: 2,
    exp: "Select the networking & content delivery option that meets AWS Certified SysOps Administrator – Associate security and governance standards. This is the recommended approach for the Networking & Content Delivery domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Cost & Performance Optimization ──
  {
    domain: "Cost & Performance Optimization",
    q: "A AWS Certified SysOps Administrator – Associate practice exam scenario covers Cost & Performance Optimization for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive cost & performance optimization credentials in plain text configuration files",
      "Skip cost & performance optimization testing before production rollout",
      "Implement cost & performance optimization without change management or rollback plans",
      "Design cost & performance optimization using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments",
    ],
    a: 3,
    exp: "Design cost & performance optimization using patterns validated in AWS Certified SysOps Administrator – Associate practice assessments. This is the recommended approach for the Cost & Performance Optimization domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Monitoring Logging & Remediation ──
  {
    domain: "Monitoring Logging & Remediation",
    q: "Which Monitoring Logging & Remediation principle is emphasized in AWS Certified SysOps Administrator – Associate when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified SysOps Administrator – Associate-aligned monitoring logging & remediation approach recommended in official exam objectives",
      "Skip monitoring logging & remediation testing before production rollout",
      "Implement monitoring logging & remediation without change management or rollback plans",
      "Use default monitoring logging & remediation settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified SysOps Administrator – Associate-aligned monitoring logging & remediation approach recommended in official exam objectives. This is the recommended approach for the Monitoring Logging & Remediation domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },

  // ── Reliability & Business Continuity ──
  {
    domain: "Reliability & Business Continuity",
    q: "A regulated financial institution failed a mock AWS Certified SysOps Administrator – Associate question on Reliability & Business Continuity. What concept should they review?",
    opts: [
      "Implement reliability & business continuity without change management or rollback plans",
      "Follow industry best practices for reliability & business continuity as defined in the AWS Certified SysOps Administrator – Associate body of knowledge",
      "Use default reliability & business continuity settings without hardening",
      "Centralize all reliability & business continuity decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for reliability & business continuity as defined in the AWS Certified SysOps Administrator – Associate body of knowledge. This is the recommended approach for the Reliability & Business Continuity domain on the AWS Certified SysOps Administrator – Associate exam and reflects current certification objectives.",
  },
];
