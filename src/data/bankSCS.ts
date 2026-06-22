import type { Question } from '../types';

export const BANK_SCS: Question[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 1: Threat Detection & Incident Response (~10 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    domain: 'Threat Detection & Incident Response',
    q: 'GuardDuty generates a finding of type UnauthorizedAccess:EC2/SSHBruteForce targeting one of your instances. Which automated response architecture best isolates the instance while preserving forensic evidence?',
    opts: [
      'Create a CloudWatch Alarm on the GuardDuty finding metric, then manually SSH into the instance to collect logs.',
      'Use an EventBridge rule to trigger a Lambda function that snapshots the EBS volumes, attaches a forensic security group allowing no inbound/outbound traffic, and tags the instance as ISOLATED.',
      'Terminate the instance immediately using Auto Scaling lifecycle hooks to prevent further compromise.',
      'Enable GuardDuty malware protection and wait for the automated remediation to complete.',
    ],
    a: 1,
    exp: 'EventBridge can consume GuardDuty findings in near-real-time and invoke Lambda for automated response. Snapshotting EBS volumes preserves forensic evidence before isolation, and replacing the security group with one that blocks all traffic is the standard isolation technique without terminating the instance.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'A GuardDuty finding of type Recon:IAMUser/MaliciousIPCaller is detected. What does this finding indicate and what is the FIRST remediation step?',
    opts: [
      'An EC2 instance is communicating with a known malicious IP; disable the instance profile immediately.',
      'An IAM user is making API calls from a known malicious IP address; disable or rotate the access keys associated with that IAM user.',
      'An S3 bucket is receiving requests from a threat intelligence-flagged IP; enable S3 Block Public Access.',
      'An IAM role has been assumed by a malicious actor; delete the role immediately.',
    ],
    a: 1,
    exp: 'The Recon:IAMUser finding class indicates that API calls are being made using IAM user credentials from an IP listed in GuardDuty threat intelligence feeds. The immediate remediation is to disable or rotate the compromised IAM access keys to stop further unauthorized API activity.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'GuardDuty generates a Policy:S3/BucketAnonymousAccessGranted finding. Which resource configuration is the ROOT CAUSE of this finding?',
    opts: [
      'The S3 bucket has server-side encryption disabled.',
      'The S3 bucket policy grants s3:GetObject to the principal "*" without a Condition.',
      'The S3 bucket does not have versioning enabled.',
      'The S3 bucket is in a different region than GuardDuty.',
    ],
    a: 1,
    exp: 'Policy:S3/BucketAnonymousAccessGranted fires when GuardDuty detects that a bucket policy or ACL allows anonymous (unauthenticated) access, which is represented by granting permissions to the wildcard principal "*". Encryption status and versioning do not affect this finding.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'Your security team needs a single pane of glass to aggregate findings from GuardDuty, Inspector, and Macie across 20 AWS accounts. Which service is BEST suited for this?',
    opts: [
      'AWS CloudTrail with organization trail enabled.',
      'Amazon CloudWatch cross-account dashboards.',
      'AWS Security Hub with cross-account finding aggregation.',
      'AWS Config with aggregator configured for all accounts.',
    ],
    a: 2,
    exp: 'AWS Security Hub is purpose-built for aggregating, normalizing, and prioritizing security findings from multiple AWS services (GuardDuty, Inspector, Macie, Firewall Manager) and third-party tools across accounts. CloudTrail and Config focus on configuration and audit logs rather than security finding aggregation.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'After detecting a potentially compromised EC2 instance, your incident response plan requires forensic analysis. What is the CORRECT order of steps to preserve evidence before remediation?',
    opts: [
      'Terminate the instance, create an AMI from the terminated instance, then analyze the AMI.',
      'Create EBS snapshots of all attached volumes, capture instance metadata (tags, security groups, IAM role), isolate the instance with a restrictive security group, then analyze the snapshots in a separate forensic account.',
      'Detach the EBS volume while the instance is running and attach it to a forensic instance for analysis.',
      'Enable VPC Flow Logs and wait 24 hours to capture sufficient network data before taking any action.',
    ],
    a: 1,
    exp: 'Forensic best practice is to preserve volatile and non-volatile evidence before isolation. Creating EBS snapshots captures disk state, capturing metadata preserves the security posture context, and then isolating the instance stops further damage. Analyzing in a separate forensic account maintains chain of custody.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'GuardDuty Malware Protection is enabled. An EC2 instance triggers a finding of type Execution:EC2/MaliciousFile. What does GuardDuty do when malware protection is active?',
    opts: [
      'It automatically quarantines the malicious file and sends an SNS notification.',
      'It initiates a scan of the EBS volumes attached to the instance by creating a replica snapshot in GuardDuty\'s service account and scanning it without impacting the running instance.',
      'It terminates the instance and replaces it with a clean AMI from the launch template.',
      'It disables the instance\'s IAM instance profile to prevent further API calls.',
    ],
    a: 1,
    exp: 'GuardDuty Malware Protection scans EBS volumes by creating a replica snapshot in a GuardDuty-managed account, which means the running instance is not interrupted. The scan is non-invasive and the original instance continues to operate during the scan process.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'Your organization wants to use Amazon Detective to investigate a GuardDuty finding. What capability does Amazon Detective provide that GuardDuty does NOT?',
    opts: [
      'Real-time threat detection using machine learning on VPC Flow Logs and CloudTrail.',
      'Automated remediation of security findings via EventBridge integrations.',
      'Interactive visual investigation with behavior graphs that show resource relationships and activity over time to determine root cause and scope of a finding.',
      'Aggregation of findings from multiple security services into a unified compliance dashboard.',
    ],
    a: 2,
    exp: 'Amazon Detective uses graph models built from VPC Flow Logs, CloudTrail, and GuardDuty findings to visualize relationships and timelines, enabling security analysts to interactively determine the root cause and blast radius of a finding. GuardDuty detects threats but does not provide this investigation capability.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'An EventBridge rule is configured to trigger a Lambda function for all HIGH severity GuardDuty findings. The Lambda function must isolate an EC2 instance by modifying its security group. Which IAM permissions does the Lambda execution role require?',
    opts: [
      'guardduty:GetFindings and ec2:TerminateInstances',
      'ec2:ModifyInstanceAttribute and ec2:RevokeSecurityGroupIngress',
      'ec2:DescribeInstances, ec2:ModifyNetworkInterfaceAttribute, and ec2:CreateSecurityGroup',
      'guardduty:UpdateFilter and ec2:StopInstances',
    ],
    a: 2,
    exp: 'To isolate an EC2 instance by replacing its security group, the Lambda function needs ec2:DescribeInstances to look up the network interface, ec2:ModifyNetworkInterfaceAttribute to replace the security group on the network interface, and ec2:CreateSecurityGroup to create the restrictive isolation security group if it does not already exist.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'An SSM Automation runbook is used as part of an incident response playbook. Which of the following is a valid use case for SSM Automation in incident response?',
    opts: [
      'Streaming GuardDuty findings to an S3 bucket for long-term archival.',
      'Automatically patching an isolated EC2 instance with the latest security patches before forensic analysis.',
      'Automatically isolating an EC2 instance, capturing memory dumps using SSM Run Command, and creating EBS snapshots in a repeatable, auditable workflow.',
      'Configuring VPC Flow Logs and enabling CloudTrail for a new account.',
    ],
    a: 2,
    exp: 'SSM Automation runbooks can orchestrate multi-step incident response workflows, including running commands on instances via SSM Run Command (for memory capture), modifying AWS resources (security groups), and creating snapshots. This provides a repeatable, auditable process that reduces human error during incident response.',
  },
  {
    domain: 'Threat Detection & Incident Response',
    q: 'A security engineer needs to investigate a GuardDuty finding related to an IAM role that may have been used by an attacker. They have access to Amazon Detective. Which Detective graph data source provides the most relevant data for analyzing IAM role activity?',
    opts: [
      'VPC Flow Logs, which show network connections made by the EC2 instance using that role.',
      'AWS CloudTrail logs, which show all API calls made using that role including source IPs and timestamps.',
      'Amazon S3 server access logs, which show which buckets were accessed using that role.',
      'AWS Config, which shows the role\'s permission boundary changes over time.',
    ],
    a: 1,
    exp: 'Amazon Detective ingests CloudTrail management events to build its behavior graphs. For IAM role investigation, CloudTrail shows every API call made with that role, the calling IP addresses, user agents, and timestamps, which is the primary data source for understanding what an attacker did with a compromised role.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 2: Security Logging & Monitoring (~13 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    domain: 'Security Logging & Monitoring',
    q: 'A company with 50 AWS accounts in an AWS Organization needs to ensure CloudTrail logs from all accounts are stored centrally and cannot be tampered with. What is the MOST efficient solution?',
    opts: [
      'Create a CloudTrail trail in each account, enable log file integrity validation, and configure each trail to deliver to an account-specific S3 bucket.',
      'Create an organization CloudTrail trail in the management account that automatically applies to all member accounts, deliver logs to a centralized S3 bucket in a dedicated log archive account with an S3 bucket policy denying deletion.',
      'Use AWS Config to aggregate compliance data from all accounts and deliver it to a central S3 bucket.',
      'Create an IAM role in each account that allows the security account to pull CloudTrail logs on demand.',
    ],
    a: 1,
    exp: 'An organization CloudTrail trail automatically enables logging in all current and future member accounts without any per-account configuration. Delivering to a centralized log archive account with a restrictive S3 bucket policy prevents member account administrators from deleting or modifying logs.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A security team wants to verify that CloudTrail log files have not been tampered with after delivery to S3. Which CloudTrail feature should be enabled, and how is it validated?',
    opts: [
      'Enable CloudTrail Insights and use the anomaly detection feature to detect log modifications.',
      'Enable CloudTrail log file integrity validation; AWS creates a digest file every hour signed with SHA-256 hashing, which you validate using the AWS CLI command aws cloudtrail validate-logs.',
      'Enable CloudTrail data events and compare the S3 access logs to verify no unauthorized GetObject calls occurred.',
      'Enable S3 Object Lock on the CloudTrail bucket in GOVERNANCE mode to prevent any modifications.',
    ],
    a: 1,
    exp: 'CloudTrail log file integrity validation creates SHA-256 digest files every hour that reference the log files and are signed by CloudTrail using a private key. The AWS CLI validate-logs command computes hashes and verifies signatures to confirm whether any log files have been deleted or modified.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'VPC Flow Logs are enabled for a VPC. A security analyst wants to identify all rejected inbound connections to a specific EC2 instance from any source IP over the last 7 days. Which query tool and approach is MOST cost-effective for ad-hoc analysis?',
    opts: [
      'Use CloudWatch Logs Insights with a filter pattern against the Flow Logs log group.',
      'Configure VPC Flow Logs to deliver to S3, create an Athena table over the S3 bucket, and run a SQL query filtering on dstaddr, action=REJECT, and a date range.',
      'Enable GuardDuty and review the NetworkConnectionAction findings for the instance.',
      'Use AWS Network Firewall alert logs to find rejected connections.',
    ],
    a: 1,
    exp: 'Storing VPC Flow Logs in S3 and querying with Amazon Athena is the most cost-effective approach for ad-hoc, long-duration analysis. Athena charges per data scanned and requires no infrastructure, while CloudWatch Logs Insights charges per query and is better for short-term log retention.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A company wants to log all DNS queries made by resources in their VPC to detect exfiltration via DNS tunneling. Which service and feature should be used?',
    opts: [
      'Enable VPC Flow Logs and filter on port 53 traffic.',
      'Configure Route 53 Resolver query logging to log all DNS queries made by resources in the VPC to CloudWatch Logs or S3.',
      'Deploy a custom DNS server on an EC2 instance and capture DNS traffic using tcpdump.',
      'Enable AWS WAF on the Application Load Balancer to inspect DNS-over-HTTPS traffic.',
    ],
    a: 1,
    exp: 'Route 53 Resolver query logging captures all DNS queries made by resources within a VPC, including the query name, query type, response code, and the resource that made the request. This is the native AWS capability for DNS visibility and is essential for detecting DNS tunneling or exfiltration patterns.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A compliance team requires that all CloudWatch Logs log groups storing security data be encrypted with a customer-managed KMS key. Which approach satisfies this requirement?',
    opts: [
      'CloudWatch Logs automatically encrypts all data at rest using AWS managed keys; no additional configuration is needed.',
      'Enable S3 server-side encryption on the S3 bucket where CloudWatch Logs exports data.',
      'Associate a KMS key with each CloudWatch Logs log group using the aws logs associate-kms-key API, and ensure the KMS key policy grants the CloudWatch Logs service principal permission to use the key.',
      'Enable CloudTrail encryption with a KMS key, which automatically propagates to all CloudWatch Logs.',
    ],
    a: 2,
    exp: 'CloudWatch Logs supports encryption using KMS customer-managed keys by associating a key with a log group. The KMS key policy must explicitly grant the logs.amazonaws.com service principal permission to use the key for encrypt and decrypt operations, otherwise CloudWatch Logs cannot write encrypted data.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'Amazon Macie is enabled in an account with multiple S3 buckets containing sensitive customer data. Macie reports a finding for a bucket. What type of findings does Macie generate?',
    opts: [
      'Network-based findings about S3 bucket public access from malicious IPs.',
      'Policy findings about bucket permission misconfigurations and sensitive data findings about S3 objects that contain sensitive data such as PII, credentials, or financial information.',
      'Infrastructure findings about missing S3 bucket encryption or versioning.',
      'IAM findings about excessive permissions granted to S3 bucket policies.',
    ],
    a: 1,
    exp: 'Amazon Macie generates two categories of findings: policy findings (e.g., bucket encryption disabled, public access enabled) and sensitive data findings (e.g., objects containing PII, AWS credentials, financial data). Macie uses ML and pattern matching to classify S3 object content.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A security engineer needs to monitor an Application Load Balancer for suspicious requests including SQL injection attempts. ALB access logs are stored in S3. Which service allows real-time alerting on these log patterns WITHOUT loading data into a database?',
    opts: [
      'Amazon Athena with scheduled queries every 5 minutes.',
      'Amazon Kinesis Data Firehose delivering ALB logs to Amazon OpenSearch Service with Kibana alerting on SQL injection patterns.',
      'AWS WAF with SQL injection match conditions applied to the ALB, with WAF sampled request logging to S3.',
      'Amazon CloudWatch Logs with metric filters detecting SQL keywords in the log stream.',
    ],
    a: 1,
    exp: 'Kinesis Data Firehose can stream ALB access logs in near-real-time to OpenSearch Service, where index patterns and Kibana alerts can detect SQL injection strings without the latency of batch Athena queries. This provides continuous monitoring rather than periodic scanning.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'What is the purpose of enabling CloudTrail S3 data events versus CloudTrail management events?',
    opts: [
      'Management events log AWS service-to-service calls, while data events log IAM policy changes.',
      'Management events record control plane operations (e.g., CreateBucket, RunInstances), while data events record data plane operations on specific resources (e.g., S3 GetObject, PutObject, Lambda Invoke).',
      'Data events are automatically enabled for all trails, while management events require explicit configuration.',
      'Management events are stored in CloudTrail event history for 90 days for free, while data events require a paid trail to store in S3.',
    ],
    a: 1,
    exp: 'Management events (control plane) cover API calls that manage AWS resources and are enabled by default. Data events cover high-volume data plane operations like S3 object-level reads and writes or Lambda function invocations, which must be explicitly enabled because they can generate very high event volumes and additional costs.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A centralized security account needs to receive Security Hub findings from 30 member accounts across an AWS Organization. What is the CORRECT way to configure cross-account Security Hub integration?',
    opts: [
      'In each member account, create an IAM role that allows the security account to call securityhub:GetFindings.',
      'Enable Security Hub in the security account, designate it as the Security Hub administrator using AWS Organizations integration, and accept the automatically created member account associations.',
      'Configure EventBridge rules in each member account to forward findings to an EventBridge event bus in the security account.',
      'Create a Security Hub custom action in each member account and configure it to send findings to the central account via SNS.',
    ],
    a: 1,
    exp: 'AWS Organizations integration with Security Hub allows designating an administrator account that automatically aggregates findings from all member accounts without requiring individual invitations. The administrator account sees all findings from member accounts in its Security Hub console.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A company needs to retain VPC Flow Logs for 3 years to meet regulatory requirements, but wants to minimize cost after the first 30 days. What is the MOST cost-effective storage strategy?',
    opts: [
      'Store VPC Flow Logs in CloudWatch Logs with a 3-year retention policy and use CloudWatch Logs Insights for analysis.',
      'Deliver VPC Flow Logs to S3 with an S3 Lifecycle policy that transitions objects to S3 Glacier Instant Retrieval after 30 days and S3 Glacier Deep Archive after 90 days.',
      'Store VPC Flow Logs in an RDS database with automated backups retained for 3 years.',
      'Use Amazon Kinesis Data Streams to buffer logs and write them to EBS volumes with snapshots for long-term retention.',
    ],
    a: 1,
    exp: 'S3 is the most cost-effective destination for long-term log retention. S3 Lifecycle policies can automatically transition data to progressively cheaper storage classes (Glacier Instant Retrieval, then Glacier Deep Archive) to minimize storage costs while meeting retention requirements.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'Security Hub has a finding that shows an S3 bucket does not have server-side encryption enabled. This finding is from the AWS Foundational Security Best Practices standard. What does this indicate about Security Hub\'s role in your environment?',
    opts: [
      'Security Hub automatically enables S3 encryption when it detects this misconfiguration.',
      'Security Hub is performing detective control checks by evaluating resource configurations against security standards and surfacing policy violations as findings.',
      'Security Hub is using GuardDuty threat intelligence to detect encryption bypass attacks.',
      'Security Hub is acting as a preventive control by blocking API calls to create unencrypted S3 buckets.',
    ],
    a: 1,
    exp: 'Security Hub performs detective controls by running automated security checks against your AWS resources based on security standards like AWS Foundational Security Best Practices, CIS Benchmarks, and PCI DSS. It detects and reports misconfigurations but does not prevent or auto-remediate them unless integrated with additional automation.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A company uses AWS WAF on CloudFront to protect its web application. They need to analyze WAF logs to understand which requests are being blocked and why. WAF logs are stored in S3. Which query approach gives analysts the FASTEST ad-hoc query capability?',
    opts: [
      'Download WAF log files from S3 and parse them locally with grep and awk scripts.',
      'Create an Amazon Athena table using the WAF log JSON format, partition by date, and query using standard SQL.',
      'Enable AWS WAF sampled requests in the console, which shows a sample of recent requests.',
      'Use Amazon CloudWatch Logs Insights on the WAF log group to search for BLOCK actions.',
    ],
    a: 1,
    exp: 'Amazon Athena with a table defined over WAF logs in S3 allows SQL queries over the full log history with partition pruning for efficient date-range queries. WAF sampled requests show only a subset and are not suitable for complete analysis; Athena provides full-fidelity ad-hoc querying.',
  },
  {
    domain: 'Security Logging & Monitoring',
    q: 'A security architect is designing a centralized logging architecture for an organization. Which combination of services provides an immutable, centralized log archive with automated delivery?',
    opts: [
      'CloudTrail → CloudWatch Logs → CloudWatch Metrics → SNS alerts.',
      'CloudTrail + VPC Flow Logs + ALB Access Logs → S3 bucket in a dedicated log archive account with S3 Object Lock (COMPLIANCE mode) and cross-account S3 bucket policies denying member account access to delete or overwrite objects.',
      'CloudTrail → Kinesis Data Streams → Lambda → DynamoDB for centralized log storage.',
      'CloudTrail → S3 → SQS → Lambda for log processing and storage in RDS.',
    ],
    a: 1,
    exp: 'A dedicated log archive account with S3 Object Lock in COMPLIANCE mode prevents even root account users from deleting or overriding locked objects, providing immutability. Cross-account bucket policies prevent member accounts from modifying or deleting the centralized logs, creating a tamper-resistant archive.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 3: Infrastructure Security (~14 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    domain: 'Infrastructure Security',
    q: 'A security engineer needs to restrict access to an EC2 instance so that only traffic from a specific corporate IP range on port 443 is allowed inbound. Which AWS resource should be configured?',
    opts: [
      'A VPC Network ACL with an inbound ALLOW rule for the corporate IP CIDR on port 443.',
      'A Security Group with an inbound rule permitting TCP port 443 from the corporate IP CIDR block, and no inbound rule allowing other traffic (implicit deny).',
      'Both A and B must be configured because security groups alone are not sufficient.',
      'An AWS WAF IP set rule attached to the VPC.',
    ],
    a: 1,
    exp: 'Security groups are stateful firewalls that operate at the instance level. A security group with an inbound rule for TCP 443 from the corporate CIDR and no other rules provides the required restriction. Security groups have an implicit deny for all other traffic without needing explicit deny rules, unlike NACLs.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'What is a key difference between Security Groups and Network ACLs (NACLs) in a VPC?',
    opts: [
      'Security groups operate at the subnet level while NACLs operate at the instance level.',
      'Security groups are stateful (return traffic is automatically allowed), while NACLs are stateless (both inbound and outbound rules must explicitly allow return traffic).',
      'NACLs support both ALLOW and DENY rules, while security groups only support ALLOW rules, and both are evaluated in order.',
      'Security groups and NACLs are equivalent; choosing either provides the same security outcome.',
    ],
    a: 1,
    exp: 'Security groups track connection state, so return traffic for allowed inbound connections is automatically permitted without an explicit outbound rule. NACLs are stateless, so you must create both inbound and outbound rules including ephemeral port ranges for return traffic. This distinction is critical for proper network security design.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'An organization needs to protect its web applications from DDoS attacks including application layer (Layer 7) volumetric attacks. Which combination of AWS services provides the MOST comprehensive protection?',
    opts: [
      'AWS Shield Standard and Amazon CloudFront are sufficient for all DDoS scenarios.',
      'AWS Shield Advanced with AWS WAF on CloudFront, with a rate-based WAF rule to block IPs exceeding request thresholds, and DDoS Response Team (DRT) access configured.',
      'AWS Network Firewall with stateful rules blocking known bad IPs and rate limiting.',
      'Amazon Route 53 with health checks and failover routing for high availability during attacks.',
    ],
    a: 1,
    exp: 'AWS Shield Advanced provides enhanced DDoS protection with 24/7 access to the DDoS Response Team, cost protection, and advanced attack visibility. Combined with AWS WAF rate-based rules on CloudFront, this addresses both network/transport layer (Shield) and application layer (WAF) attacks.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'An AWS WAF Web ACL is configured on an ALB. A security engineer wants to block all requests from countries other than the United States. Which WAF rule type achieves this with the LEAST management overhead?',
    opts: [
      'Create an IP set rule with all US IP address ranges manually maintained.',
      'Use a Geo match condition in a WAF rule that blocks all requests where the country is NOT US, using a NOT statement around a geo match for the US.',
      'Use an AWS Managed Rule Group that includes geographic restrictions.',
      'Configure CloudFront to restrict geographic access before requests reach the ALB.',
    ],
    a: 1,
    exp: 'WAF Geo match conditions use AWS\'s built-in geolocation database that is automatically maintained. A NOT statement wrapping a geo match rule for the US creates a block rule for all other countries. This requires no manual IP list maintenance, unlike maintaining a custom IP set of all US ranges.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'A company\'s EC2 instances in a private subnet need to access S3 and DynamoDB without traversing the public internet. Which type of VPC endpoint should be used for each service?',
    opts: [
      'Interface endpoints for both S3 and DynamoDB, which use AWS PrivateLink.',
      'Gateway endpoints for both S3 and DynamoDB, which add routes to route tables.',
      'Gateway endpoints for S3 and DynamoDB (both support gateway endpoints), which are free and route traffic through the AWS network without traversing the internet.',
      'NAT Gateway with S3 Transfer Acceleration for optimal performance.',
    ],
    a: 2,
    exp: 'S3 and DynamoDB are the two services that support Gateway VPC endpoints, which are free and work by adding entries to route tables to route traffic through AWS\'s internal network. Interface endpoints (PrivateLink) are used for most other AWS services and incur hourly and data processing charges.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'An AWS Network Firewall is deployed in a centralized inspection VPC using a Transit Gateway. A stateful rule group is configured to allow HTTP traffic to specific domains. Which type of Network Firewall rule achieves domain-based filtering?',
    opts: [
      'A stateless rule group with a custom action that passes traffic to the stateful engine.',
      'A stateful rule group using the STRICT_ORDER rule evaluation with a domain list rule specifying allowed HTTP/HTTPS domains, with a default action to DROP all other traffic.',
      'A stateful rule group using Suricata-compatible IDS/IPS rules with HTTP host header inspection.',
      'Both B and C are valid approaches for domain-based filtering; they use different mechanisms.',
    ],
    a: 3,
    exp: 'AWS Network Firewall supports two methods for domain filtering in stateful rule groups: domain list rules that allow or deny traffic to specific FQDNs for HTTP/HTTPS, and Suricata-compatible IPS rules that can inspect HTTP host headers. Both are valid and can be combined for comprehensive filtering.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'A company wants to allow their on-premises applications to access services in AWS privately using AWS PrivateLink. The service is deployed behind a Network Load Balancer. What must be configured to enable this?',
    opts: [
      'Create a VPC peering connection between the on-premises VPC and the service VPC, then use route tables to direct traffic.',
      'Create a VPC endpoint service on the provider side (attaching it to the NLB), and create a VPC Interface endpoint in the consumer VPC. Route on-premises traffic through Direct Connect or VPN to the consumer VPC.',
      'Configure an AWS Transit Gateway to connect the on-premises network and service VPC, then use Transit Gateway route tables.',
      'Make the NLB internet-facing and use security groups to restrict access to on-premises IP ranges.',
    ],
    a: 1,
    exp: 'AWS PrivateLink requires creating an endpoint service on the provider side (associated with an NLB) and interface endpoints on the consumer side. On-premises access requires Direct Connect or VPN to reach the consumer VPC, from which traffic can use the interface endpoint to reach the service privately.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'A security team wants to eliminate the need for bastion hosts to access EC2 instances in private subnets while maintaining auditability of all session activity. Which service achieves this?',
    opts: [
      'AWS Direct Connect with a hosted connection provides secure access without bastion hosts.',
      'AWS Systems Manager Session Manager, which provides browser-based and CLI shell access to EC2 instances without requiring open inbound ports, using the SSM Agent and IAM for authentication, with session logs sent to CloudWatch Logs or S3.',
      'VPC peering with the corporate network enables direct access to private instances.',
      'AWS Client VPN with mutual TLS authentication provides secure access without bastion hosts.',
    ],
    a: 1,
    exp: 'AWS Systems Manager Session Manager eliminates bastion hosts by tunneling sessions through the SSM service, requiring no inbound security group rules or SSH keys. All session activity is logged to CloudWatch Logs or S3 for audit purposes, and IAM policies control who can start sessions.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'AWS Firewall Manager is deployed in an organization to manage WAF Web ACLs across all accounts. What is the PRIMARY benefit of using Firewall Manager over managing WAF independently in each account?',
    opts: [
      'Firewall Manager provides a lower cost per WAF rule compared to standalone WAF.',
      'Firewall Manager automatically creates and applies WAF Web ACL policies to all accounts and resources in the organization, including new accounts, ensuring consistent security posture without per-account configuration.',
      'Firewall Manager allows WAF to inspect encrypted HTTPS traffic without certificate management.',
      'Firewall Manager provides real-time DDoS mitigation that standard WAF cannot achieve.',
    ],
    a: 1,
    exp: 'AWS Firewall Manager enables centralized management of WAF Web ACLs, Shield Advanced protections, Security Groups, and Network Firewall policies across an entire AWS Organization. Policies are automatically applied to new accounts and resources as they are created, ensuring consistent enforcement without per-account manual configuration.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'An organization uses AWS Shield Advanced. During a DDoS attack, they incur significant data transfer and EC2 costs due to absorbing the attack traffic. What Shield Advanced feature helps address these costs?',
    opts: [
      'Shield Advanced automatically scales EC2 Auto Scaling groups to absorb attack traffic at no additional cost.',
      'Shield Advanced provides DDoS cost protection, which credits the account for scaling charges (EC2, ELB, CloudFront) incurred during a verified DDoS attack.',
      'Shield Advanced blocks all attack traffic at the AWS network edge before it reaches your resources, so no additional charges are incurred.',
      'Shield Advanced includes unlimited AWS WAF rules that absorb attack costs.',
    ],
    a: 1,
    exp: 'AWS Shield Advanced includes DDoS cost protection as a benefit of the subscription. If a customer incurs scaling costs (EC2 Auto Scaling, ELB, CloudFront) due to a DDoS attack, they can request credits from AWS. This protects against unexpected bills caused by DDoS-induced resource scaling.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'A company uses AWS Transit Gateway to connect 10 VPCs. They want to apply centralized egress filtering for all VPCs to inspect outbound internet traffic. What architecture achieves this?',
    opts: [
      'Place a NAT Gateway in each VPC and configure security groups to restrict outbound ports.',
      'Create a centralized egress VPC with a NAT Gateway and AWS Network Firewall, route outbound traffic from all spoke VPCs through the Transit Gateway to the egress VPC for inspection before reaching the internet.',
      'Enable VPC Flow Logs on all VPCs and use Lambda to block suspicious outbound connections.',
      'Apply AWS WAF to all Transit Gateway attachments to inspect egress traffic.',
    ],
    a: 1,
    exp: 'A centralized egress architecture uses Transit Gateway to route outbound traffic from spoke VPCs to a dedicated egress VPC containing Network Firewall (for deep packet inspection and domain filtering) and a NAT Gateway. This provides centralized control and visibility for all outbound internet traffic.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'AWS WAF is configured with a rate-based rule limiting any single IP to 1000 requests per 5 minutes. An attacker uses 10,000 different IP addresses to send requests below the rate limit from each IP. Which WAF feature can help mitigate this distributed attack?',
    opts: [
      'Increase the rate-based rule threshold to cover the total request volume.',
      'Use AWS WAF Fraud Control Account Takeover Prevention or use a CAPTCHA action on suspicious requests, and add AWS Shield Advanced DRT integration to identify and block the attack pattern.',
      'Enable AWS WAF Bot Control managed rule group, which includes bot fingerprinting that can identify distributed bot traffic patterns even when distributed across many IP addresses.',
      'Create a geographic restriction rule to limit access to known countries.',
    ],
    a: 2,
    exp: 'AWS WAF Bot Control uses browser fingerprinting, behavioral analysis, and ML to identify automated bot traffic even when distributed across thousands of IPs, each below rate limits. It can detect patterns like identical browser signatures or request cadences that indicate coordinated bot activity regardless of source IP diversity.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'A company is deploying an AWS Direct Connect connection to connect their data center to AWS. What security control should be applied to protect data in transit over the Direct Connect connection?',
    opts: [
      'Direct Connect traffic is encrypted by default using AWS-managed TLS, so no additional configuration is needed.',
      'Deploy a Site-to-Site VPN over the Direct Connect connection using IPSec encryption, or use MACsec encryption on Direct Connect connections that support it for Layer 2 encryption.',
      'Use AWS PrivateLink to encrypt all traffic traversing the Direct Connect connection.',
      'Enable VPC Flow Logs to monitor all traffic and detect any unencrypted data transfers.',
    ],
    a: 1,
    exp: 'AWS Direct Connect is a private network connection but does NOT provide encryption by default. To protect data in transit, you can run an IPSec VPN tunnel over the Direct Connect connection for encryption, or for supported connection types, enable MACsec (IEEE 802.1AE) for Layer 2 encryption on the physical connection.',
  },
  {
    domain: 'Infrastructure Security',
    q: 'A security engineer wants to configure a WAF rule to block requests that do not contain a specific HTTP header used as an API key. Which WAF rule component achieves this?',
    opts: [
      'A geo match condition that allows only requests from the US, where the API key header is required.',
      'A rule using a NOT statement wrapping a string match condition on the request header, with a BLOCK action when the header is absent or does not match the expected value.',
      'A rate-based rule that limits requests without the API key header to 0 per 5 minutes.',
      'An IP set rule that only allows requests from known API client IP addresses.',
    ],
    a: 1,
    exp: 'A WAF rule with a NOT statement wrapping a string match on a specific header name and value will match requests where the header is absent or does not contain the expected API key. Applying a BLOCK action to this rule rejects all requests that fail the API key check.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 4: Identity & Access Management (~11 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    domain: 'Identity & Access Management',
    q: 'An IAM policy evaluation must determine whether an action is allowed. In what order does IAM evaluate policies, and what is the effect of an explicit DENY?',
    opts: [
      'Allow policies are evaluated first; if an Allow is found, the request proceeds. DENY policies are only checked if no Allow is found.',
      'IAM evaluates all applicable policies (identity-based, resource-based, SCPs, permission boundaries, session policies). An explicit DENY in any policy always overrides any ALLOW, regardless of other policies.',
      'Resource-based policies take precedence over identity-based policies; SCPs only apply to resource-based access.',
      'Permission boundaries only apply to IAM roles created by the delegated administrator account.',
    ],
    a: 1,
    exp: 'IAM policy evaluation starts with an implicit DENY for all actions. It then evaluates SCPs, permission boundaries, session policies, identity-based policies, and resource-based policies. An explicit DENY in ANY applicable policy immediately denies the request, overriding all Allow statements. The final decision is Allow only if no Deny exists and at least one Allow exists.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'A company uses AWS Organizations with SCPs. A developer in a member account has an IAM policy granting s3:* on all resources, but they cannot access S3. What is the MOST likely cause?',
    opts: [
      'The developer\'s IAM policy has a syntax error that prevents it from being evaluated correctly.',
      'An SCP attached to the developer\'s account or OU denies S3 actions or does not include an Allow for S3, effectively blocking access because IAM and SCP must both allow the action.',
      'The S3 bucket has a resource-based policy that denies access from the developer\'s account.',
      'The developer is attempting cross-region S3 access which requires additional IAM permissions.',
    ],
    a: 1,
    exp: 'SCPs serve as guardrails: for an action to be allowed in a member account, both the SCP and the IAM policy must allow it. If the SCP does not allow s3:* (whether through an explicit deny or by not including S3 in an allow list SCP), the developer\'s IAM permission grant is ineffective because SCPs take precedence.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'A security engineer needs to ensure that a junior administrator can create and manage IAM users but cannot escalate their own privileges by creating policies that exceed the permissions defined in a boundary policy. Which IAM feature enforces this?',
    opts: [
      'IAM Access Analyzer, which detects when new IAM policies would grant excessive permissions.',
      'Permission Boundaries: set a permission boundary on all IAM users and roles the junior admin creates, limiting the maximum permissions any identity they create can have. Combine with an IAM policy that requires the junior admin to attach the boundary when creating users.',
      'AWS Organizations SCPs, which prevent any IAM user from exceeding the SCP allowance.',
      'IAM condition keys using aws:PrincipalArn to restrict who can create IAM policies.',
    ],
    a: 1,
    exp: 'Permission boundaries define the maximum permissions an IAM entity can have, regardless of what policies are attached to it. By requiring the junior admin to always attach a specific permission boundary when creating users (enforced via an IAM condition on iam:CreateUser), you prevent privilege escalation even if the admin attaches overly permissive policies.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'A company wants to implement Attribute-Based Access Control (ABAC) in AWS. Tags are used to control access to resources. An IAM policy should allow EC2 actions only on instances where the resource tag "Project" matches the principal tag "Project". Which condition key achieves this?',
    opts: [
      'aws:ResourceTag/Project = ${aws:RequestedRegion}',
      'aws:ResourceTag/Project = ${aws:PrincipalTag/Project}',
      'ec2:ResourceTag/Project = ${iam:ResourceTag/Project}',
      'aws:TagKeys = Project and ec2:TagKeys = Project',
    ],
    a: 1,
    exp: 'The ABAC pattern uses the condition aws:ResourceTag/Project matching the ${aws:PrincipalTag/Project} policy variable. This dynamically evaluates whether the resource\'s Project tag equals the requesting principal\'s Project tag, allowing access to only resources tagged with the same project as the user.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'IAM Access Analyzer is enabled. It generates a finding for an S3 bucket. What type of access does this finding indicate?',
    opts: [
      'The bucket has encryption disabled, which Access Analyzer considers a security risk.',
      'The bucket is accessible by a principal outside the zone of trust (the AWS account or organization), indicating potential unintended external access via the bucket policy or ACL.',
      'The bucket contains sensitive data detected by Access Analyzer\'s data scanning capabilities.',
      'The bucket has more than 100 IAM policies attached, exceeding the recommended limit.',
    ],
    a: 1,
    exp: 'IAM Access Analyzer identifies resources (S3 buckets, IAM roles, KMS keys, Lambda functions, SQS queues, Secrets Manager secrets) that are shared with external principals outside the defined zone of trust (account or organization). A finding for an S3 bucket means a policy allows access from outside the zone of trust.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'A company wants to federate their corporate Active Directory with AWS for management console access. Their AD uses SAML 2.0. Which AWS configuration is required?',
    opts: [
      'Create IAM users that match each AD username and configure AWS SSO to sync with AD.',
      'Configure an IAM SAML 2.0 identity provider with the AD Federation Services (AD FS) metadata, create IAM roles for each access level, and configure AD FS relying party trust for AWS with SAML attribute mapping to IAM role ARNs.',
      'Use Amazon Cognito user pools with Active Directory as the upstream SAML provider.',
      'Install the AWS Directory Service AD Connector and link it to IAM for direct AD group-to-IAM role mapping.',
    ],
    a: 1,
    exp: 'SAML 2.0 federation with IAM requires creating an IAM identity provider using the AD FS metadata XML, creating IAM roles with the SAML identity provider as the trusted principal, and configuring AD FS to issue SAML assertions containing the AWS role ARN and identity provider ARN as attributes that IAM uses for role assumption.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'AWS IAM Identity Center (SSO) is configured for an organization. What advantage does it provide over traditional IAM user-based access for multi-account environments?',
    opts: [
      'IAM Identity Center provides lower latency authentication compared to IAM users.',
      'IAM Identity Center provides centralized SSO access with temporary credentials to multiple AWS accounts from a single sign-on portal, with permission sets that are centrally managed and eliminate the need for long-lived IAM user credentials in each account.',
      'IAM Identity Center automatically enforces MFA for all users without any configuration.',
      'IAM Identity Center provides automatic IAM role rotation every 24 hours for enhanced security.',
    ],
    a: 1,
    exp: 'IAM Identity Center enables single sign-on to multiple AWS accounts using permission sets (collections of policies). Users authenticate once through a central portal and receive temporary credentials for each account they access, eliminating long-lived IAM access keys and the management overhead of maintaining IAM users in each account.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'An application running on EC2 needs to access DynamoDB tables. The EC2 instance must NOT use long-lived access keys. What is the CORRECT approach?',
    opts: [
      'Store IAM access keys in the EC2 instance\'s /etc/aws/credentials file with restricted file permissions.',
      'Assign an IAM instance profile (IAM role) to the EC2 instance. The application retrieves temporary credentials from the EC2 Instance Metadata Service (IMDS), which are automatically rotated.',
      'Use AWS Secrets Manager to store IAM access keys and rotate them every 30 days.',
      'Create an IAM user specific to the application and embed the credentials in environment variables.',
    ],
    a: 1,
    exp: 'IAM instance profiles attach an IAM role to EC2 instances. The EC2 metadata service (IMDS) provides automatically rotated temporary credentials that SDKs retrieve transparently. This eliminates long-lived credentials and is the AWS-recommended approach for EC2-based applications.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'Amazon Cognito is used for a mobile application. Users authenticate with Cognito User Pools. The app needs to access S3 to upload user-specific files. Users should only be able to access their own files. Which Cognito feature enables per-user S3 access control?',
    opts: [
      'Cognito User Pool triggers with a Lambda pre-token generation function that adds S3 permissions to the JWT.',
      'Cognito Identity Pools (Federated Identities) with an IAM role that includes a condition using ${cognito-identity.amazonaws.com:sub} to scope S3 prefix access to the authenticated user\'s unique Cognito identity ID.',
      'Cognito User Pool resource servers with custom scopes mapped to S3 bucket policies.',
      'Cognito Sync to synchronize user-specific S3 bucket names to each device.',
    ],
    a: 1,
    exp: 'Cognito Identity Pools exchange Cognito User Pool tokens for temporary AWS credentials via IAM roles. By including an S3 condition like s3:prefix = ${cognito-identity.amazonaws.com:sub}/* in the IAM role policy, each user can only access the S3 path that corresponds to their unique Cognito identity ID.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'A cross-account IAM role is configured in Account B (resource account) to be assumed by Account A (workload account). An IAM user in Account A is getting an AccessDenied error when trying to sts:AssumeRole. What are the TWO required conditions for the assumption to succeed?',
    opts: [
      'The role in Account B must have a resource-based policy attached, and Account A must have VPC peering with Account B.',
      'The role in Account B must have a trust policy that includes Account A\'s account ID (or specific principal) as a trusted principal, AND the IAM user in Account A must have an identity-based policy that allows sts:AssumeRole for the role ARN in Account B.',
      'The IAM user in Account A must have the AdministratorAccess managed policy, and the role in Account B must not have a permission boundary.',
      'An STS session token must be pre-generated in Account B and shared with Account A.',
    ],
    a: 1,
    exp: 'Cross-account role assumption requires two things: (1) the role\'s trust policy in Account B must allow the calling principal from Account A (sts:AssumeRole action), and (2) the calling IAM user/role in Account A must have an explicit sts:AssumeRole permission for the target role ARN. Both must be present; neither alone is sufficient.',
  },
  {
    domain: 'Identity & Access Management',
    q: 'A company uses Service Control Policies (SCPs) to prevent any account from disabling CloudTrail. The SCP is attached to the Root OU. An administrator in a member account with AdministratorAccess attempts to run aws cloudtrail delete-trail and receives AccessDenied. Which statement correctly explains why?',
    opts: [
      'AdministratorAccess does not include CloudTrail permissions; the administrator needs an explicit CloudTrail policy.',
      'The SCP acts as a guardrail that restricts what even an Administrator can do; since the SCP denies cloudtrail:DeleteTrail, the administrator\'s AWS managed policy Allow is overridden by the SCP.',
      'CloudTrail trails can only be deleted from the management account, not member accounts.',
      'The member account needs to be removed from the OU before an administrator can delete CloudTrail trails.',
    ],
    a: 1,
    exp: 'SCPs restrict the maximum permissions available in an account. Even an IAM user with AdministratorAccess (which grants all actions) cannot perform actions prohibited by SCPs. The SCP deny on cloudtrail:DeleteTrail applies to all principals in the account, including root and administrators, making it an effective preventive control.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 5: Data Protection (~13 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    domain: 'Data Protection',
    q: 'A company needs to encrypt S3 objects using keys that they fully manage (key material, rotation, deletion), without AWS having access to the key material. Which S3 encryption option meets this requirement?',
    opts: [
      'SSE-S3: S3 manages the encryption keys using AES-256.',
      'SSE-KMS: AWS KMS manages customer-managed keys (CMKs) stored in AWS hardware.',
      'SSE-C: The customer provides and manages the encryption key with each request; AWS does not store the key.',
      'DSSE-KMS: Dual-layer SSE using two KMS keys for double encryption.',
    ],
    a: 2,
    exp: 'SSE-C (Server-Side Encryption with Customer-Provided Keys) allows customers to supply their own encryption keys with each PUT/GET request. AWS uses the key to encrypt/decrypt the object and then discards it without storing it. This gives customers complete control over key material outside of AWS.',
  },
  {
    domain: 'Data Protection',
    q: 'An AWS KMS customer-managed key (CMK) is used to encrypt S3 objects. The key must be rotated annually. What is the effect of enabling automatic key rotation on a CMK?',
    opts: [
      'AWS KMS creates a new CMK with a new key ID each year, and all existing encrypted data must be re-encrypted with the new key.',
      'AWS KMS generates new key material for the CMK annually, but the key ID, ARN, and alias remain the same. AWS KMS uses the appropriate key material version to decrypt existing data automatically.',
      'Automatic rotation requires the customer to manually approve key rotation in the KMS console each year.',
      'Automatic key rotation changes the key policy to allow rotation and requires a new key grant to be created.',
    ],
    a: 1,
    exp: 'When automatic rotation is enabled, KMS generates new cryptographic material annually while maintaining the same key ID and ARN. Old key material versions are retained to decrypt data encrypted with previous versions. Existing encrypted data does NOT need to be re-encrypted because KMS tracks which key version was used for each encryption.',
  },
  {
    domain: 'Data Protection',
    q: 'A company wants to implement envelope encryption for data stored in a custom application. What is the correct process for envelope encryption using AWS KMS?',
    opts: [
      'Send all data directly to KMS for encryption; KMS stores the ciphertext and returns a reference.',
      'Generate a data encryption key (DEK) using KMS GenerateDataKey, use the plaintext DEK to encrypt the data locally, store the encrypted DEK alongside the ciphertext, and discard the plaintext DEK. Decrypt by calling KMS to decrypt the DEK, then use the plaintext DEK to decrypt the data.',
      'Use KMS to encrypt the S3 object key, then encrypt the object content using the encrypted S3 key.',
      'Configure the application to call KMS Encrypt for each data record; KMS handles all encryption operations.',
    ],
    a: 1,
    exp: 'Envelope encryption generates a unique DEK per record/object using KMS GenerateDataKey, which returns both plaintext and encrypted versions. The application encrypts data locally with the plaintext DEK (which is fast for large data), stores the KMS-encrypted DEK with the ciphertext, and discards the plaintext DEK. This pattern avoids sending large amounts of data to KMS.',
  },
  {
    domain: 'Data Protection',
    q: 'An S3 bucket must be configured so that objects cannot be deleted or overwritten for a minimum of 7 years to meet regulatory requirements. What is the CORRECT configuration?',
    opts: [
      'Enable S3 Versioning and configure MFA Delete on the bucket.',
      'Enable S3 Object Lock with COMPLIANCE mode and a retention period of 7 years (2,555 days). In COMPLIANCE mode, no user including root can delete or alter a locked object before the retention period expires.',
      'Apply an S3 lifecycle policy that prevents deletion of objects younger than 7 years.',
      'Enable S3 Replication to a second bucket with Object Lock enabled as the compliance backup.',
    ],
    a: 1,
    exp: 'S3 Object Lock COMPLIANCE mode provides WORM (Write Once Read Many) protection. Once set, no user—including the root account—can delete or overwrite locked objects before the retention period expires. GOVERNANCE mode allows users with special permissions to override, making COMPLIANCE the correct choice for regulatory requirements.',
  },
  {
    domain: 'Data Protection',
    q: 'A company uses AWS Certificate Manager (ACM) to manage TLS certificates for their ALBs. A certificate is due to expire in 30 days. What ACM feature prevents this certificate from expiring?',
    opts: [
      'ACM sends an email reminder 30 days before expiration; the security team must manually renew the certificate.',
      'ACM automatically renews public certificates issued by ACM before they expire, without any manual intervention, as long as the certificate is in use and the domain validation is still valid.',
      'The security team must generate a new CSR, submit it to ACM, and reattach it to the ALB.',
      'ACM automatically renews certificates for Route 53-managed domains only; external domains must be renewed manually.',
    ],
    a: 1,
    exp: 'ACM automatically renews public TLS certificates that are associated with supported AWS services (ALB, CloudFront, API Gateway) before expiration. ACM handles the renewal process including domain validation (DNS or email) automatically when Route 53 DNS validation is configured, requiring zero manual intervention.',
  },
  {
    domain: 'Data Protection',
    q: 'An application needs to retrieve a database password at runtime without it being stored in code, environment variables, or configuration files. The password should be automatically rotated every 30 days. Which AWS service is BEST suited for this?',
    opts: [
      'AWS Systems Manager Parameter Store SecureString, which encrypts the value with KMS and provides automatic rotation.',
      'AWS Secrets Manager, which stores secrets encrypted with KMS and natively supports automatic rotation of database credentials (RDS, Redshift, DocumentDB) using a Lambda rotation function.',
      'AWS KMS key aliases, which store secrets as key metadata and provide automatic rotation.',
      'Amazon S3 SSE-KMS encrypted objects with a lifecycle policy to replace the password file every 30 days.',
    ],
    a: 1,
    exp: 'AWS Secrets Manager is purpose-built for secret storage with native automatic rotation support for RDS, Redshift, and DocumentDB. It uses a Lambda function to generate a new password, update the database, and store the new secret, all automatically on a defined schedule. Parameter Store SecureString does not natively support automatic rotation.',
  },
  {
    domain: 'Data Protection',
    q: 'A company stores sensitive data in RDS MySQL. They require encryption at rest using a customer-managed KMS key. When must encryption be enabled on an RDS instance?',
    opts: [
      'Encryption can be enabled on any existing RDS instance at any time by modifying the instance settings in the console.',
      'RDS encryption must be enabled at instance creation time; existing unencrypted instances cannot be directly encrypted. To encrypt an existing instance, you must create an encrypted snapshot and restore a new instance from the encrypted snapshot.',
      'RDS encryption is enabled automatically when the instance is placed in a private subnet.',
      'RDS encryption can be enabled by enabling AWS Backup for the instance and selecting encrypted backups.',
    ],
    a: 1,
    exp: 'RDS encryption must be configured at instance launch. You cannot enable encryption on a running unencrypted RDS instance. The migration path is: create a snapshot of the unencrypted instance, copy the snapshot with encryption enabled (selecting a KMS key), then restore a new encrypted RDS instance from the encrypted snapshot.',
  },
  {
    domain: 'Data Protection',
    q: 'An EBS volume is attached to an EC2 instance and contains sensitive data. The volume is unencrypted. A compliance requirement mandates all EBS volumes be encrypted with a customer-managed KMS key. What is the CORRECT migration process?',
    opts: [
      'Detach the EBS volume and use the AWS CLI to enable encryption on the existing volume ID.',
      'Create a snapshot of the unencrypted volume, copy the snapshot specifying the customer-managed KMS key to create an encrypted copy, create a new encrypted EBS volume from the encrypted snapshot, detach the original volume, and attach the new encrypted volume.',
      'Enable account-level EBS encryption in the EC2 settings, which automatically re-encrypts existing volumes.',
      'Use AWS DataSync to copy the volume contents to a new encrypted EBS volume.',
    ],
    a: 1,
    exp: 'EBS volumes cannot be encrypted in-place after creation. The migration path is: snapshot the unencrypted volume, copy the snapshot with a KMS key specified (this creates an encrypted snapshot), restore an EBS volume from the encrypted snapshot, and swap the volumes. Enabling account-level encryption only affects newly created volumes, not existing ones.',
  },
  {
    domain: 'Data Protection',
    q: 'A company uses AWS KMS with a key policy. A developer claims they cannot use a KMS key even though they have an IAM policy granting kms:Decrypt. What is the MOST likely reason?',
    opts: [
      'IAM policies are the only mechanism needed for KMS access; the developer must have made an error in the IAM policy.',
      'KMS key policies are resource-based policies that must explicitly grant access to IAM identities or accounts. If the key policy does not include a statement allowing the IAM account or principal, IAM policies alone are insufficient.',
      'KMS key access requires an SCP in AWS Organizations to explicitly allow KMS actions.',
      'The developer must use the root account credentials to access KMS keys; IAM users cannot access KMS directly.',
    ],
    a: 1,
    exp: 'KMS key access requires the key policy to explicitly authorize the AWS account or specific IAM principals. Unlike most AWS services where IAM policies alone grant resource access, KMS key policies must include the account (enabling IAM policies to work) or the specific principal. Without an appropriate key policy statement, IAM policies alone are insufficient.',
  },
  {
    domain: 'Data Protection',
    q: 'What is the difference between AWS KMS AWS-managed keys (aws/service) and customer-managed keys (CMKs)?',
    opts: [
      'AWS-managed keys use symmetric encryption while CMKs use asymmetric encryption.',
      'AWS-managed keys are created and managed by AWS for specific services, cannot be customized, auto-rotate every 3 years, and cannot be deleted. CMKs are created by customers, support custom key policies, grants, and aliases, can be rotated annually on-demand, and can be disabled or scheduled for deletion.',
      'CMKs are free while AWS-managed keys have a per-request charge.',
      'AWS-managed keys use CloudHSM hardware while CMKs use software-based key storage.',
    ],
    a: 1,
    exp: 'AWS-managed keys are automatically created by services on your behalf, rotate automatically every year (previously 3 years), cannot have custom key policies beyond resource policies, and cannot be deleted. CMKs give customers full control: custom key policies, grants, manual or automatic rotation, import of external key material, deletion scheduling, and multi-region replication.',
  },
  {
    domain: 'Data Protection',
    q: 'CloudTrail logs are stored in S3 and must be encrypted. The company policy requires using a customer-managed KMS key. An IAM user who can access S3 but does not have KMS permissions tries to read the CloudTrail log files. What happens?',
    opts: [
      'S3 automatically decrypts the logs for users with S3 GetObject permission, regardless of KMS permissions.',
      'The user receives an AccessDenied error from KMS when S3 attempts to decrypt the log file, because decryption requires both S3 GetObject permission and KMS Decrypt permission for the key used to encrypt the logs.',
      'The user can download the encrypted log files but cannot read the contents without a separate decryption tool.',
      'The user is prompted to enter the KMS key ARN to decrypt the files during download.',
    ],
    a: 1,
    exp: 'When S3 objects are encrypted with SSE-KMS, retrieving an object causes S3 to call KMS to decrypt the data key. The requester\'s IAM credentials must have kms:Decrypt (or kms:GenerateDataKey) permission on the KMS key. Without this, the KMS call fails with AccessDenied even if the user has s3:GetObject on the bucket.',
  },
  {
    domain: 'Data Protection',
    q: 'A company wants to use AWS CloudHSM instead of AWS KMS CMKs for their encryption needs. What is the PRIMARY advantage of CloudHSM over KMS CMKs?',
    opts: [
      'CloudHSM is significantly cheaper than KMS for high-volume encryption operations.',
      'CloudHSM provides dedicated, single-tenant HSM appliances where only the customer controls the HSM partition and key material; AWS has no access to the keys. This meets strict compliance requirements (e.g., FIPS 140-2 Level 3) that require exclusive customer control over the HSM.',
      'CloudHSM supports more encryption algorithms than KMS, including custom proprietary ciphers.',
      'CloudHSM automatically integrates with all AWS services that support KMS, making it a drop-in replacement.',
    ],
    a: 1,
    exp: 'AWS CloudHSM provides dedicated hardware security modules where customers have exclusive control over key material and HSM administration. AWS manages the hardware but has NO access to the HSMs or keys. This satisfies compliance requirements (FIPS 140-2 Level 3 validated) that mandate dedicated, customer-controlled key storage. KMS is multi-tenant with AWS managing the underlying HSMs.',
  },
  {
    domain: 'Data Protection',
    q: 'A company uses AWS Secrets Manager to store API keys for a third-party service. The rotation Lambda function needs to call the third-party API to generate new keys. Where should the Secrets Manager rotation Lambda function be deployed for security?',
    opts: [
      'Deploy the Lambda function in a public subnet with an internet gateway for third-party API access.',
      'Deploy the Lambda function in a private VPC subnet with a NAT Gateway for outbound internet access to the third-party API, and a VPC endpoint for Secrets Manager so the function can access Secrets Manager privately.',
      'Deploy the Lambda function without a VPC to use the default internet connectivity and call Secrets Manager through the public endpoint.',
      'Deploy the Lambda function in the same VPC as the application, with direct network access to both Secrets Manager and the third-party API.',
    ],
    a: 1,
    exp: 'The rotation Lambda should be in a private subnet to minimize its attack surface. A NAT Gateway provides outbound internet access for third-party API calls, while a Secrets Manager VPC interface endpoint ensures the Lambda function accesses Secrets Manager through AWS\'s private network without traversing the internet. This follows the principle of least exposure.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DOMAIN 6: Management & Security Governance (~10 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    domain: 'Management & Security Governance',
    q: 'An organization wants to prevent any member account from creating IAM users with console access. They want this applied to all accounts in the organization. Which approach is CORRECT?',
    opts: [
      'Create a custom IAM policy in each member account that denies iam:CreateLoginProfile and distribute it using CloudFormation StackSets.',
      'Create an SCP that denies iam:CreateLoginProfile and iam:CreateUser with a condition, and attach it to the Root OU or all relevant OUs in the organization.',
      'Enable IAM Access Analyzer in the management account to detect all IAM users with console access.',
      'Use AWS Control Tower to create a mandatory guardrail that sends alerts when IAM users are created with console access.',
    ],
    a: 1,
    exp: 'SCPs applied to the root OU or organizational units affect all member accounts in that scope. A deny SCP on iam:CreateLoginProfile prevents console password creation for IAM users across all accounts. CloudFormation StackSets would require per-account deployment and could be circumvented by account administrators, while SCPs cannot be overridden.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'AWS Control Tower is deployed to manage a multi-account AWS environment. What is the difference between preventive and detective guardrails in Control Tower?',
    opts: [
      'Preventive guardrails use CloudWatch alarms, while detective guardrails use AWS Config rules.',
      'Preventive guardrails are implemented as SCPs that block non-compliant actions before they occur. Detective guardrails are implemented as AWS Config rules that identify non-compliant resources after they are created but do not block the action.',
      'Preventive guardrails apply to new accounts only, while detective guardrails apply to existing accounts.',
      'Detective guardrails are free with Control Tower, while preventive guardrails require an additional Security Hub subscription.',
    ],
    a: 1,
    exp: 'Control Tower preventive guardrails use SCPs to disallow actions that would violate the policy, stopping non-compliant actions before they happen. Detective guardrails use AWS Config rules to continuously monitor resources and identify non-compliant configurations after creation, reporting violations without blocking the initial action.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'An organization needs to demonstrate compliance with PCI DSS for their AWS environment. Which AWS service provides automated checks against PCI DSS requirements?',
    opts: [
      'AWS CloudTrail with PCI DSS-specific log filters configured as CloudWatch metric alarms.',
      'AWS Security Hub with the PCI DSS security standard enabled, which runs automated checks against AWS resources and presents findings mapped to specific PCI DSS requirements.',
      'AWS Config with the PCI DSS conformance pack deployed, which evaluates resources against PCI DSS controls.',
      'Both B and C are valid options; Security Hub for continuous monitoring and Config conformance packs for detailed compliance reporting.',
    ],
    a: 3,
    exp: 'Both AWS Security Hub (with PCI DSS standard) and AWS Config (with PCI DSS conformance packs) provide automated compliance checking against PCI DSS controls. Security Hub aggregates and prioritizes findings with a compliance score, while Config conformance packs deploy Config rules mapped to specific PCI DSS requirements. Using both provides comprehensive coverage.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'A company needs to ensure all new AWS accounts created in their organization automatically have security baseline configurations (CloudTrail, Config, GuardDuty) enabled. Which service automates this?',
    opts: [
      'AWS Organizations: configure a policy in the management account that automatically enables services in new accounts.',
      'AWS Control Tower: when a new account is provisioned through Account Factory, Control Tower automatically applies guardrails and enables baseline services like CloudTrail, Config, and optionally GuardDuty through the integrated services.',
      'AWS Config Aggregator: deploy an aggregator in the management account that automatically configures member accounts.',
      'AWS Service Catalog: create a portfolio of security products that are automatically launched in new accounts.',
    ],
    a: 1,
    exp: 'AWS Control Tower Account Factory provisions new accounts with pre-configured security baselines including organization CloudTrail, AWS Config, and other controls. Guardrails are automatically applied to accounts enrolled in Control Tower. This provides consistent security configuration for every new account without manual intervention.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'An AWS Config rule evaluates whether all S3 buckets have server-side encryption enabled. The rule is NON_COMPLIANT for 5 buckets. What is the CORRECT way to auto-remediate these buckets using Config?',
    opts: [
      'Configure a CloudWatch Events rule to trigger a Lambda function when Config rules change to NON_COMPLIANT status.',
      'Configure automatic remediation on the Config rule using an SSM Automation document (runbook) that enables S3 bucket encryption. Config will invoke the runbook for non-compliant resources.',
      'Create an AWS Config conformance pack that includes a remediation action to enable encryption.',
      'Use AWS Security Hub to trigger auto-remediation when a Security Hub finding is created from the Config rule.',
    ],
    a: 1,
    exp: 'AWS Config supports automatic remediation by associating an SSM Automation runbook with a Config rule. When resources are evaluated as NON_COMPLIANT, Config can automatically invoke the SSM runbook to remediate the resource. This provides a native, integrated auto-remediation capability without requiring external Lambda or EventBridge configurations.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'A company is implementing the CIS AWS Foundations Benchmark. One requirement is to ensure no root account access keys exist. Which AWS service or feature verifies this automatically?',
    opts: [
      'AWS GuardDuty detects root account access key usage and generates findings.',
      'AWS Security Hub with the CIS AWS Foundations Benchmark standard enabled automatically checks whether root account access keys exist and reports as a finding if they do.',
      'AWS IAM Access Analyzer scans for root account access keys and generates external access findings.',
      'AWS Config with the root-account-mfa-enabled managed rule checks for root access keys.',
    ],
    a: 1,
    exp: 'AWS Security Hub\'s CIS AWS Foundations Benchmark standard includes a specific control (CIS 1.4) that checks whether root account access keys exist. This control automatically evaluates the IAM credential report and generates a FAILED finding in Security Hub if root access keys are present.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'An organization wants to separate workloads into distinct AWS accounts for security isolation. Which account segregation strategy aligns with AWS Well-Architected Framework security pillar recommendations?',
    opts: [
      'Use a single AWS account with strict IAM boundaries between teams using permission boundaries.',
      'Use a multi-account strategy with separate accounts for each environment (dev, test, prod) and functional domains (security tooling, log archive, shared services), organized into OUs within AWS Organizations with appropriate SCPs.',
      'Use two AWS accounts—one for production and one for non-production—with cross-account IAM roles for access.',
      'Use separate AWS regions within a single account to isolate workloads, leveraging IAM condition keys on the aws:RequestedRegion condition.',
    ],
    a: 1,
    exp: 'The AWS Well-Architected Security Pillar recommends account-level isolation as a strong security boundary. A multi-account strategy with environment and functional segregation (management, security tooling, log archive, shared services, workload accounts) provides blast radius reduction, simplified compliance, and independent billing. OUs with SCPs enforce governance across the structure.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'AWS Config is configured to record all resource configurations. A security engineer wants to determine what IAM policy was attached to a role at a specific point 6 months ago. How can AWS Config help?',
    opts: [
      'AWS Config stores the entire IAM policy document for each policy version in its configuration history.',
      'AWS Config records configuration snapshots of IAM resources including role attached policies at each evaluation point, allowing you to view the configuration timeline and see what policies were attached at any historical point in time.',
      'AWS Config generates CloudTrail events for IAM changes; review the CloudTrail event history for the specific date.',
      'AWS Config can only show the current configuration state, not historical configurations.',
    ],
    a: 1,
    exp: 'AWS Config maintains a configuration history for each tracked resource, including IAM roles and their attached policies. The configuration timeline view shows a chronological record of changes, allowing you to see exactly what was attached to a role at any point in the retention period (up to 7 years with a delivery channel to S3).',
  },
  {
    domain: 'Management & Security Governance',
    q: 'A security governance requirement states that all production IAM roles must have permission boundaries applied. How can this be enforced at scale across all accounts in an organization?',
    opts: [
      'Create a manual review process where the security team audits all IAM role creations weekly.',
      'Use an SCP that denies iam:CreateRole unless the request includes the iam:PermissionsBoundary condition key set to a specific approved permission boundary ARN. Combine with an AWS Config rule to detect existing roles without boundaries.',
      'Use IAM Access Analyzer to generate access preview alerts when roles are created without boundaries.',
      'Apply a mandatory tag policy requiring a "PermissionBoundary" tag on all IAM roles.',
    ],
    a: 1,
    exp: 'An SCP with a condition on iam:PermissionsBoundary prevents the creation of IAM roles without the required permission boundary, acting as a preventive control. An AWS Config rule provides a detective control to identify any existing roles that may have been created before the SCP was applied, ensuring both prevention and detection.',
  },
  {
    domain: 'Management & Security Governance',
    q: 'A company is undergoing a SOC 2 Type II audit. The auditor needs evidence that security controls have been continuously operating over the past 12 months. Which AWS service provides the BEST source of continuous compliance evidence?',
    opts: [
      'AWS CloudTrail event history, which shows API activity for the past 90 days.',
      'AWS Config configuration history delivered to S3 combined with Security Hub compliance findings history, providing continuous evidence of resource configurations and control evaluations over time.',
      'AWS Trusted Advisor reports, which provide point-in-time security recommendations.',
      'AWS Inspector vulnerability scan reports, which show vulnerability trends over time.',
    ],
    a: 1,
    exp: 'AWS Config records continuous configuration changes and compliance evaluations, providing a 12-month historical record of resource configurations and Config rule compliance status. Security Hub aggregates compliance findings over time. Together, these provide continuous evidence that security controls have been in place and evaluated throughout the audit period.',
  },

  // ── Additional SCS-C02 practice questions (59 added) ──

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "A team at a media company with global users debates Threat Detection & Incident Response options while studying AWS Certified Security – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all threat detection & incident response decisions without stakeholder review",
      "Deprecate threat detection & incident response controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses threat detection & incident response policies",
      "Design threat detection & incident response using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design threat detection & incident response using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "Which Security Logging & Monitoring capability is validated by AWS Certified Security – Specialty for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned security logging & monitoring approach recommended in official exam objectives",
      "Deprecate security logging & monitoring controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security logging & monitoring policies",
      "Disable monitoring for security logging & monitoring to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned security logging & monitoring approach recommended in official exam objectives. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "When evaluating Infrastructure Security tools for AWS Certified Security – Specialty, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Use an undocumented workaround that bypasses infrastructure security policies",
      "Follow industry best practices for infrastructure security as defined in the AWS Certified Security – Specialty body of knowledge",
      "Disable monitoring for infrastructure security to improve performance",
      "Grant excessive privileges that violate infrastructure security least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for infrastructure security as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "A healthcare organization must document Identity & Access Management procedures for AWS Certified Security – Specialty compliance. Which standard applies?",
    opts: [
      "Disable monitoring for identity & access management to improve performance",
      "Grant excessive privileges that violate identity & access management least-privilege principles",
      "Implement the standard identity & access management solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Rely solely on manual processes with no identity & access management automation",
    ],
    a: 2,
    exp: "Implement the standard identity & access management solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "A AWS Certified Security – Specialty instructor asks about Data Protection in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate data protection least-privilege principles",
      "Rely solely on manual processes with no data protection automation",
      "Ignore data protection compliance requirements for faster deployment",
      "Use the certified data protection methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified data protection methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "Which Management & Security Governance metric best indicates AWS Certified Security – Specialty readiness for a government agency?",
    opts: [
      "Adopt the management & security governance control framework referenced in AWS Certified Security – Specialty study materials",
      "Rely solely on manual processes with no management & security governance automation",
      "Ignore management & security governance compliance requirements for faster deployment",
      "Mix production and test management & security governance configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the management & security governance control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "A SaaS startup scaling rapidly is troubleshooting a Threat Detection & Incident Response issue while preparing for AWS Certified Security – Specialty. What is the first step?",
    opts: [
      "Ignore threat detection & incident response compliance requirements for faster deployment",
      "Configure threat detection & incident response according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Mix production and test threat detection & incident response configurations in one environment",
      "Store sensitive threat detection & incident response credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure threat detection & incident response according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "In AWS Certified Security – Specialty, how should a manufacturing company modernizing IT handle a trade-off involving Security Logging & Monitoring?",
    opts: [
      "Mix production and test security logging & monitoring configurations in one environment",
      "Store sensitive security logging & monitoring credentials in plain text configuration files",
      "Select the security logging & monitoring option that meets AWS Certified Security – Specialty security and governance standards",
      "Skip security logging & monitoring testing before production rollout",
    ],
    a: 2,
    exp: "Select the security logging & monitoring option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "Which Infrastructure Security pattern is commonly tested on AWS Certified Security – Specialty for scenarios involving a media company with global users?",
    opts: [
      "Store sensitive infrastructure security credentials in plain text configuration files",
      "Skip infrastructure security testing before production rollout",
      "Implement infrastructure security without change management or rollback plans",
      "Design infrastructure security using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design infrastructure security using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "A multinational enterprise is preparing for AWS Certified Security – Specialty and must strengthen Identity & Access Management. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned identity & access management approach recommended in official exam objectives",
      "Skip identity & access management testing before production rollout",
      "Implement identity & access management without change management or rollback plans",
      "Use default identity & access management settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned identity & access management approach recommended in official exam objectives. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "During a AWS Certified Security – Specialty readiness review at a regulated financial institution, which Data Protection approach meets certification objectives?",
    opts: [
      "Implement data protection without change management or rollback plans",
      "Follow industry best practices for data protection as defined in the AWS Certified Security – Specialty body of knowledge",
      "Use default data protection settings without hardening",
      "Centralize all data protection decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for data protection as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "A consultant advising a healthcare organization on AWS Certified Security – Specialty recommends improvements to Management & Security Governance. What should they implement?",
    opts: [
      "Use default management & security governance settings without hardening",
      "Centralize all management & security governance decisions without stakeholder review",
      "Implement the standard management & security governance solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Deprecate management & security governance controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard management & security governance solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "Which Threat Detection & Incident Response strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Security – Specialty standards?",
    opts: [
      "Centralize all threat detection & incident response decisions without stakeholder review",
      "Deprecate threat detection & incident response controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses threat detection & incident response policies",
      "Use the certified threat detection & incident response methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified threat detection & incident response methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "An audit of a government agency reveals gaps in Security Logging & Monitoring for AWS Certified Security – Specialty. Which remediation is CORRECT?",
    opts: [
      "Adopt the security logging & monitoring control framework referenced in AWS Certified Security – Specialty study materials",
      "Deprecate security logging & monitoring controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security logging & monitoring policies",
      "Disable monitoring for security logging & monitoring to improve performance",
    ],
    a: 0,
    exp: "Adopt the security logging & monitoring control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Security – Specialty study plan focused on Infrastructure Security. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses infrastructure security policies",
      "Configure infrastructure security according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Disable monitoring for infrastructure security to improve performance",
      "Grant excessive privileges that violate infrastructure security least-privilege principles",
    ],
    a: 1,
    exp: "Configure infrastructure security according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "When a manufacturing company modernizing IT implements AWS Certified Security – Specialty controls for Identity & Access Management, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for identity & access management to improve performance",
      "Grant excessive privileges that violate identity & access management least-privilege principles",
      "Select the identity & access management option that meets AWS Certified Security – Specialty security and governance standards",
      "Rely solely on manual processes with no identity & access management automation",
    ],
    a: 2,
    exp: "Select the identity & access management option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "A AWS Certified Security – Specialty practice exam scenario covers Data Protection for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate data protection least-privilege principles",
      "Rely solely on manual processes with no data protection automation",
      "Ignore data protection compliance requirements for faster deployment",
      "Design data protection using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design data protection using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "Which Management & Security Governance principle is emphasized in AWS Certified Security – Specialty when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned management & security governance approach recommended in official exam objectives",
      "Rely solely on manual processes with no management & security governance automation",
      "Ignore management & security governance compliance requirements for faster deployment",
      "Mix production and test management & security governance configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned management & security governance approach recommended in official exam objectives. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "A regulated financial institution failed a mock AWS Certified Security – Specialty question on Threat Detection & Incident Response. What concept should they review?",
    opts: [
      "Ignore threat detection & incident response compliance requirements for faster deployment",
      "Follow industry best practices for threat detection & incident response as defined in the AWS Certified Security – Specialty body of knowledge",
      "Mix production and test threat detection & incident response configurations in one environment",
      "Store sensitive threat detection & incident response credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for threat detection & incident response as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "For AWS Certified Security – Specialty certification, Security Logging & Monitoring knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test security logging & monitoring configurations in one environment",
      "Store sensitive security logging & monitoring credentials in plain text configuration files",
      "Implement the standard security logging & monitoring solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Skip security logging & monitoring testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard security logging & monitoring solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "A team at a high-traffic e-commerce platform debates Infrastructure Security options while studying AWS Certified Security – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive infrastructure security credentials in plain text configuration files",
      "Skip infrastructure security testing before production rollout",
      "Implement infrastructure security without change management or rollback plans",
      "Use the certified infrastructure security methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified infrastructure security methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "Which Identity & Access Management capability is validated by AWS Certified Security – Specialty for organizations such as a government agency?",
    opts: [
      "Adopt the identity & access management control framework referenced in AWS Certified Security – Specialty study materials",
      "Skip identity & access management testing before production rollout",
      "Implement identity & access management without change management or rollback plans",
      "Use default identity & access management settings without hardening",
    ],
    a: 0,
    exp: "Adopt the identity & access management control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "When evaluating Data Protection tools for AWS Certified Security – Specialty, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement data protection without change management or rollback plans",
      "Configure data protection according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Use default data protection settings without hardening",
      "Centralize all data protection decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure data protection according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "A manufacturing company modernizing IT must document Management & Security Governance procedures for AWS Certified Security – Specialty compliance. Which standard applies?",
    opts: [
      "Use default management & security governance settings without hardening",
      "Centralize all management & security governance decisions without stakeholder review",
      "Select the management & security governance option that meets AWS Certified Security – Specialty security and governance standards",
      "Deprecate management & security governance controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the management & security governance option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "A AWS Certified Security – Specialty instructor asks about Threat Detection & Incident Response in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all threat detection & incident response decisions without stakeholder review",
      "Deprecate threat detection & incident response controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses threat detection & incident response policies",
      "Design threat detection & incident response using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design threat detection & incident response using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "Which Security Logging & Monitoring metric best indicates AWS Certified Security – Specialty readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned security logging & monitoring approach recommended in official exam objectives",
      "Deprecate security logging & monitoring controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security logging & monitoring policies",
      "Disable monitoring for security logging & monitoring to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned security logging & monitoring approach recommended in official exam objectives. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "A regulated financial institution is troubleshooting a Infrastructure Security issue while preparing for AWS Certified Security – Specialty. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses infrastructure security policies",
      "Follow industry best practices for infrastructure security as defined in the AWS Certified Security – Specialty body of knowledge",
      "Disable monitoring for infrastructure security to improve performance",
      "Grant excessive privileges that violate infrastructure security least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for infrastructure security as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "In AWS Certified Security – Specialty, how should a healthcare organization handle a trade-off involving Identity & Access Management?",
    opts: [
      "Disable monitoring for identity & access management to improve performance",
      "Grant excessive privileges that violate identity & access management least-privilege principles",
      "Implement the standard identity & access management solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Rely solely on manual processes with no identity & access management automation",
    ],
    a: 2,
    exp: "Implement the standard identity & access management solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "Which Data Protection pattern is commonly tested on AWS Certified Security – Specialty for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate data protection least-privilege principles",
      "Rely solely on manual processes with no data protection automation",
      "Ignore data protection compliance requirements for faster deployment",
      "Use the certified data protection methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified data protection methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "A government agency is preparing for AWS Certified Security – Specialty and must strengthen Management & Security Governance. Which option is BEST?",
    opts: [
      "Adopt the management & security governance control framework referenced in AWS Certified Security – Specialty study materials",
      "Rely solely on manual processes with no management & security governance automation",
      "Ignore management & security governance compliance requirements for faster deployment",
      "Mix production and test management & security governance configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the management & security governance control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "During a AWS Certified Security – Specialty readiness review at a SaaS startup scaling rapidly, which Threat Detection & Incident Response approach meets certification objectives?",
    opts: [
      "Ignore threat detection & incident response compliance requirements for faster deployment",
      "Configure threat detection & incident response according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Mix production and test threat detection & incident response configurations in one environment",
      "Store sensitive threat detection & incident response credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure threat detection & incident response according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified Security – Specialty recommends improvements to Security Logging & Monitoring. What should they implement?",
    opts: [
      "Mix production and test security logging & monitoring configurations in one environment",
      "Store sensitive security logging & monitoring credentials in plain text configuration files",
      "Select the security logging & monitoring option that meets AWS Certified Security – Specialty security and governance standards",
      "Skip security logging & monitoring testing before production rollout",
    ],
    a: 2,
    exp: "Select the security logging & monitoring option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "Which Infrastructure Security strategy is MOST appropriate when a media company with global users adopts AWS Certified Security – Specialty standards?",
    opts: [
      "Store sensitive infrastructure security credentials in plain text configuration files",
      "Skip infrastructure security testing before production rollout",
      "Implement infrastructure security without change management or rollback plans",
      "Design infrastructure security using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design infrastructure security using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "An audit of a multinational enterprise reveals gaps in Identity & Access Management for AWS Certified Security – Specialty. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned identity & access management approach recommended in official exam objectives",
      "Skip identity & access management testing before production rollout",
      "Implement identity & access management without change management or rollback plans",
      "Use default identity & access management settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned identity & access management approach recommended in official exam objectives. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "A regulated financial institution is designing a AWS Certified Security – Specialty study plan focused on Data Protection. Which resource topic is essential?",
    opts: [
      "Implement data protection without change management or rollback plans",
      "Follow industry best practices for data protection as defined in the AWS Certified Security – Specialty body of knowledge",
      "Use default data protection settings without hardening",
      "Centralize all data protection decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for data protection as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "When a healthcare organization implements AWS Certified Security – Specialty controls for Management & Security Governance, which practice reduces operational risk?",
    opts: [
      "Use default management & security governance settings without hardening",
      "Centralize all management & security governance decisions without stakeholder review",
      "Implement the standard management & security governance solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Deprecate management & security governance controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard management & security governance solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "A AWS Certified Security – Specialty practice exam scenario covers Threat Detection & Incident Response for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Centralize all threat detection & incident response decisions without stakeholder review",
      "Deprecate threat detection & incident response controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses threat detection & incident response policies",
      "Use the certified threat detection & incident response methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified threat detection & incident response methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "Which Security Logging & Monitoring principle is emphasized in AWS Certified Security – Specialty when supporting a government agency?",
    opts: [
      "Adopt the security logging & monitoring control framework referenced in AWS Certified Security – Specialty study materials",
      "Deprecate security logging & monitoring controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security logging & monitoring policies",
      "Disable monitoring for security logging & monitoring to improve performance",
    ],
    a: 0,
    exp: "Adopt the security logging & monitoring control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified Security – Specialty question on Infrastructure Security. What concept should they review?",
    opts: [
      "Use an undocumented workaround that bypasses infrastructure security policies",
      "Configure infrastructure security according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Disable monitoring for infrastructure security to improve performance",
      "Grant excessive privileges that violate infrastructure security least-privilege principles",
    ],
    a: 1,
    exp: "Configure infrastructure security according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "For AWS Certified Security – Specialty certification, Identity & Access Management knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Disable monitoring for identity & access management to improve performance",
      "Grant excessive privileges that violate identity & access management least-privilege principles",
      "Select the identity & access management option that meets AWS Certified Security – Specialty security and governance standards",
      "Rely solely on manual processes with no identity & access management automation",
    ],
    a: 2,
    exp: "Select the identity & access management option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "A team at a media company with global users debates Data Protection options while studying AWS Certified Security – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Grant excessive privileges that violate data protection least-privilege principles",
      "Rely solely on manual processes with no data protection automation",
      "Ignore data protection compliance requirements for faster deployment",
      "Design data protection using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design data protection using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "Which Management & Security Governance capability is validated by AWS Certified Security – Specialty for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned management & security governance approach recommended in official exam objectives",
      "Rely solely on manual processes with no management & security governance automation",
      "Ignore management & security governance compliance requirements for faster deployment",
      "Mix production and test management & security governance configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned management & security governance approach recommended in official exam objectives. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "When evaluating Threat Detection & Incident Response tools for AWS Certified Security – Specialty, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Ignore threat detection & incident response compliance requirements for faster deployment",
      "Follow industry best practices for threat detection & incident response as defined in the AWS Certified Security – Specialty body of knowledge",
      "Mix production and test threat detection & incident response configurations in one environment",
      "Store sensitive threat detection & incident response credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for threat detection & incident response as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "A healthcare organization must document Security Logging & Monitoring procedures for AWS Certified Security – Specialty compliance. Which standard applies?",
    opts: [
      "Mix production and test security logging & monitoring configurations in one environment",
      "Store sensitive security logging & monitoring credentials in plain text configuration files",
      "Implement the standard security logging & monitoring solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Skip security logging & monitoring testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard security logging & monitoring solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "A AWS Certified Security – Specialty instructor asks about Infrastructure Security in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Store sensitive infrastructure security credentials in plain text configuration files",
      "Skip infrastructure security testing before production rollout",
      "Implement infrastructure security without change management or rollback plans",
      "Use the certified infrastructure security methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified infrastructure security methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "Which Identity & Access Management metric best indicates AWS Certified Security – Specialty readiness for a government agency?",
    opts: [
      "Adopt the identity & access management control framework referenced in AWS Certified Security – Specialty study materials",
      "Skip identity & access management testing before production rollout",
      "Implement identity & access management without change management or rollback plans",
      "Use default identity & access management settings without hardening",
    ],
    a: 0,
    exp: "Adopt the identity & access management control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "A SaaS startup scaling rapidly is troubleshooting a Data Protection issue while preparing for AWS Certified Security – Specialty. What is the first step?",
    opts: [
      "Implement data protection without change management or rollback plans",
      "Configure data protection according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Use default data protection settings without hardening",
      "Centralize all data protection decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure data protection according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "In AWS Certified Security – Specialty, how should a manufacturing company modernizing IT handle a trade-off involving Management & Security Governance?",
    opts: [
      "Use default management & security governance settings without hardening",
      "Centralize all management & security governance decisions without stakeholder review",
      "Select the management & security governance option that meets AWS Certified Security – Specialty security and governance standards",
      "Deprecate management & security governance controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the management & security governance option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "Which Threat Detection & Incident Response pattern is commonly tested on AWS Certified Security – Specialty for scenarios involving a media company with global users?",
    opts: [
      "Centralize all threat detection & incident response decisions without stakeholder review",
      "Deprecate threat detection & incident response controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses threat detection & incident response policies",
      "Design threat detection & incident response using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design threat detection & incident response using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "A multinational enterprise is preparing for AWS Certified Security – Specialty and must strengthen Security Logging & Monitoring. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned security logging & monitoring approach recommended in official exam objectives",
      "Deprecate security logging & monitoring controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses security logging & monitoring policies",
      "Disable monitoring for security logging & monitoring to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned security logging & monitoring approach recommended in official exam objectives. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "During a AWS Certified Security – Specialty readiness review at a regulated financial institution, which Infrastructure Security approach meets certification objectives?",
    opts: [
      "Use an undocumented workaround that bypasses infrastructure security policies",
      "Follow industry best practices for infrastructure security as defined in the AWS Certified Security – Specialty body of knowledge",
      "Disable monitoring for infrastructure security to improve performance",
      "Grant excessive privileges that violate infrastructure security least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for infrastructure security as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "A consultant advising a healthcare organization on AWS Certified Security – Specialty recommends improvements to Identity & Access Management. What should they implement?",
    opts: [
      "Disable monitoring for identity & access management to improve performance",
      "Grant excessive privileges that violate identity & access management least-privilege principles",
      "Implement the standard identity & access management solution that satisfies AWS Certified Security – Specialty domain requirements",
      "Rely solely on manual processes with no identity & access management automation",
    ],
    a: 2,
    exp: "Implement the standard identity & access management solution that satisfies AWS Certified Security – Specialty domain requirements. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "Which Data Protection strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Security – Specialty standards?",
    opts: [
      "Grant excessive privileges that violate data protection least-privilege principles",
      "Rely solely on manual processes with no data protection automation",
      "Ignore data protection compliance requirements for faster deployment",
      "Use the certified data protection methodology specified for AWS Certified Security – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified data protection methodology specified for AWS Certified Security – Specialty candidates. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Management & Security Governance ──
  {
    domain: "Management & Security Governance",
    q: "An audit of a government agency reveals gaps in Management & Security Governance for AWS Certified Security – Specialty. Which remediation is CORRECT?",
    opts: [
      "Adopt the management & security governance control framework referenced in AWS Certified Security – Specialty study materials",
      "Rely solely on manual processes with no management & security governance automation",
      "Ignore management & security governance compliance requirements for faster deployment",
      "Mix production and test management & security governance configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the management & security governance control framework referenced in AWS Certified Security – Specialty study materials. This is the recommended approach for the Management & Security Governance domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Threat Detection & Incident Response ──
  {
    domain: "Threat Detection & Incident Response",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Security – Specialty study plan focused on Threat Detection & Incident Response. Which resource topic is essential?",
    opts: [
      "Ignore threat detection & incident response compliance requirements for faster deployment",
      "Configure threat detection & incident response according to AWS Certified Security – Specialty exam blueprint recommendations",
      "Mix production and test threat detection & incident response configurations in one environment",
      "Store sensitive threat detection & incident response credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure threat detection & incident response according to AWS Certified Security – Specialty exam blueprint recommendations. This is the recommended approach for the Threat Detection & Incident Response domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Security Logging & Monitoring ──
  {
    domain: "Security Logging & Monitoring",
    q: "When a manufacturing company modernizing IT implements AWS Certified Security – Specialty controls for Security Logging & Monitoring, which practice reduces operational risk?",
    opts: [
      "Mix production and test security logging & monitoring configurations in one environment",
      "Store sensitive security logging & monitoring credentials in plain text configuration files",
      "Select the security logging & monitoring option that meets AWS Certified Security – Specialty security and governance standards",
      "Skip security logging & monitoring testing before production rollout",
    ],
    a: 2,
    exp: "Select the security logging & monitoring option that meets AWS Certified Security – Specialty security and governance standards. This is the recommended approach for the Security Logging & Monitoring domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Infrastructure Security ──
  {
    domain: "Infrastructure Security",
    q: "A AWS Certified Security – Specialty practice exam scenario covers Infrastructure Security for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive infrastructure security credentials in plain text configuration files",
      "Skip infrastructure security testing before production rollout",
      "Implement infrastructure security without change management or rollback plans",
      "Design infrastructure security using patterns validated in AWS Certified Security – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design infrastructure security using patterns validated in AWS Certified Security – Specialty practice assessments. This is the recommended approach for the Infrastructure Security domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Identity & Access Management ──
  {
    domain: "Identity & Access Management",
    q: "Which Identity & Access Management principle is emphasized in AWS Certified Security – Specialty when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Security – Specialty-aligned identity & access management approach recommended in official exam objectives",
      "Skip identity & access management testing before production rollout",
      "Implement identity & access management without change management or rollback plans",
      "Use default identity & access management settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Security – Specialty-aligned identity & access management approach recommended in official exam objectives. This is the recommended approach for the Identity & Access Management domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },

  // ── Data Protection ──
  {
    domain: "Data Protection",
    q: "A regulated financial institution failed a mock AWS Certified Security – Specialty question on Data Protection. What concept should they review?",
    opts: [
      "Implement data protection without change management or rollback plans",
      "Follow industry best practices for data protection as defined in the AWS Certified Security – Specialty body of knowledge",
      "Use default data protection settings without hardening",
      "Centralize all data protection decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for data protection as defined in the AWS Certified Security – Specialty body of knowledge. This is the recommended approach for the Data Protection domain on the AWS Certified Security – Specialty exam and reflects current certification objectives.",
  },
];
