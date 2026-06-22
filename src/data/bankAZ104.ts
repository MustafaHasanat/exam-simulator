import type { Question } from '../types';

export const BANK_AZ104: Question[] = [
  // ─── Manage Azure Identities & Governance ─────────────────────────────────
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Microsoft Entra ID group type automatically adds members based on user attribute values such as department or job title?',
    opts: [
      'Assigned group',
      'Dynamic user group',
      'Security group',
      'Microsoft 365 group',
    ],
    a: 1,
    exp: 'Dynamic user groups in Microsoft Entra ID automatically manage membership using rules based on user attributes (e.g., department, jobTitle). When a user\'s attribute changes to match the rule, they are automatically added or removed from the group.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Microsoft Entra ID account type allows external partners to access your resources using their own organizational credentials?',
    opts: [
      'Member user',
      'Guest user (B2B)',
      'Service principal',
      'Managed identity',
    ],
    a: 1,
    exp: 'Guest users (B2B collaboration) allow external users from partner organizations to access your Azure resources using their own organizational or personal credentials. They appear with a #EXT# suffix in the UPN and have limited default permissions.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'In Azure RBAC, at which scope level does assigning a role to a user grant them access to all child resources automatically?',
    opts: [
      'Resource scope only',
      'The scope of assignment and all child scopes (inheritance)',
      'Resource group scope only',
      'Subscription scope only',
    ],
    a: 1,
    exp: 'Azure RBAC uses inheritance — when you assign a role at a parent scope (e.g., management group or subscription), the permission inherits to all child scopes (subscriptions, resource groups, resources). This allows efficient permission management.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which RBAC built-in role provides read-only access to all Azure resources?',
    opts: [
      'Contributor',
      'Owner',
      'Reader',
      'User Access Administrator',
    ],
    a: 2,
    exp: 'The Reader role allows users to view all Azure resources but not make any changes. It is useful for auditors, support staff, or stakeholders who need visibility into resources without the ability to modify them.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Azure feature allows you to group multiple subscriptions under a hierarchy for centralized policy and access management?',
    opts: [
      'Resource groups',
      'Management Groups',
      'Azure Blueprints',
      'Azure subscriptions',
    ],
    a: 1,
    exp: 'Management Groups allow you to organize Azure subscriptions into a hierarchy for applying Azure Policy, RBAC, and other governance controls at scale. Policies and role assignments at the management group level inherit to all child subscriptions.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'You need to ensure that all virtual machines in a subscription have a specific tag applied at deployment time. Which governance tool enforces this?',
    opts: [
      'Azure Blueprints',
      'Resource locks',
      'Azure Policy',
      'Management Groups',
    ],
    a: 2,
    exp: 'Azure Policy can enforce tagging requirements by using the "require a tag" built-in policy definition, which can deny deployments that do not include the specified tag. Policy initiatives can group multiple tag-related policies together.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Azure Policy effect evaluates resources during deployment and prevents non-compliant deployments from being created?',
    opts: [
      'Audit',
      'Deny',
      'Append',
      'Modify',
    ],
    a: 1,
    exp: 'The Deny effect prevents a resource deployment or update if it does not comply with the policy rule, returning an error to the caller. The Audit effect allows deployment but marks non-compliant resources in the compliance dashboard.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which type of resource lock prevents users from modifying or deleting a resource, making it fully read-only?',
    opts: [
      'CanNotDelete',
      'ReadOnly',
      'DenyWrite',
      'NoModify',
    ],
    a: 1,
    exp: 'A ReadOnly lock prevents any modifications or deletions to a resource, effectively making it read-only for all authorized users. A CanNotDelete lock only prevents deletion, still allowing authorized modifications to the resource.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Azure Privileged Identity Management (PIM) feature allows users to request temporary elevated access only when needed?',
    opts: [
      'Permanent role assignment',
      'Just-In-Time (JIT) role activation',
      'Conditional Access',
      'RBAC delegation',
    ],
    a: 1,
    exp: 'PIM\'s Just-In-Time access allows eligible users to temporarily activate privileged roles for a specific time window when needed, reducing the permanent exposure of privileged access. Activations can require approval, MFA, and justification.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Azure governance feature allows you to create a budget and alert when spending reaches 80% of the defined amount?',
    opts: [
      'Azure Advisor',
      'Azure Cost Management budgets',
      'Azure Policy',
      'Resource tags',
    ],
    a: 1,
    exp: 'Azure Cost Management budgets allow you to set monthly, quarterly, or annual spending limits and configure alerts at defined percentage thresholds. When costs reach the threshold, notifications are sent to specified recipients.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'A policy initiative in Azure Policy is best described as:',
    opts: [
      'A single policy rule applied to a scope',
      'A collection of policy definitions grouped to achieve a compliance goal',
      'A template for deploying governance resources',
      'A report of non-compliant resources',
    ],
    a: 1,
    exp: 'A policy initiative (also called a policy set definition) groups multiple Azure Policy definitions together to achieve a broader compliance goal, such as all policies needed to achieve PCI DSS compliance. It simplifies assigning and tracking multiple policies.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Azure RBAC role allows a user to grant and revoke access to Azure resources for other users?',
    opts: [
      'Contributor',
      'Reader',
      'User Access Administrator',
      'Security Administrator',
    ],
    a: 2,
    exp: 'The User Access Administrator role allows users to manage user access to Azure resources without having full resource management permissions. The Owner role also includes this capability along with full resource management rights.',
  },
  {
    domain: 'Manage Azure Identities & Governance',
    q: 'Which Azure resource allows you to apply governance controls, policies, and role assignments in a repeatable package to new subscriptions?',
    opts: [
      'ARM templates',
      'Azure Policy',
      'Azure Blueprints',
      'Management Groups',
    ],
    a: 2,
    exp: 'Azure Blueprints package together ARM templates, policy assignments, role assignments, and resource groups into a single artifact that can be assigned to subscriptions. Unlike ARM templates alone, blueprints track deployment history and authorization.',
  },

  // ─── Implement & Manage Storage ───────────────────────────────────────────
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure storage redundancy option replicates data synchronously across three Availability Zones within the same region?',
    opts: [
      'Locally Redundant Storage (LRS)',
      'Geo-Redundant Storage (GRS)',
      'Zone-Redundant Storage (ZRS)',
      'Geo-Zone-Redundant Storage (GZRS)',
    ],
    a: 2,
    exp: 'Zone-Redundant Storage (ZRS) replicates data synchronously across three Azure Availability Zones in the same region, providing protection against datacenter-level failures while keeping data within a single region. It offers higher durability than LRS.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure storage redundancy option provides the highest durability by replicating data across regions AND across availability zones?',
    opts: [
      'LRS',
      'GRS',
      'ZRS',
      'GZRS',
    ],
    a: 3,
    exp: 'Geo-Zone-Redundant Storage (GZRS) combines ZRS in the primary region (data copied across three availability zones) with asynchronous replication to a secondary region, providing maximum durability of 16 nines against data loss.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure Blob Storage access tier stores data offline and has the lowest storage cost but the highest retrieval cost and latency?',
    opts: [
      'Hot',
      'Cool',
      'Cold',
      'Archive',
    ],
    a: 3,
    exp: 'The Archive tier stores blob data in an offline state with the lowest storage cost per GB but highest access costs and rehydration times (up to 15 hours for standard priority). It is designed for data accessed less than once per year.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure Blob Storage feature automatically moves blobs between access tiers (hot, cool, archive) based on defined rules after a specified number of days?',
    opts: [
      'Soft delete',
      'Blob versioning',
      'Lifecycle management policies',
      'Object replication',
    ],
    a: 2,
    exp: 'Blob lifecycle management policies allow you to define rules that automatically transition blobs to cooler tiers or delete them based on their age or last access time. This optimizes storage costs without manual intervention.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure Files feature keeps a synchronized copy of on-premises Windows file shares in Azure for cloud tiering?',
    opts: [
      'Azure File shares direct mount',
      'Azure File Sync',
      'Blob Storage replication',
      'Azure Data Box',
    ],
    a: 1,
    exp: 'Azure File Sync allows you to centralize your organization\'s file shares in Azure while maintaining local access through Windows Server caches. Cloud tiering can move infrequently accessed files to Azure while keeping frequently accessed files local.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which type of SAS token grants access to specific resources within a storage account and allows you to specify permissions per service?',
    opts: [
      'Account SAS',
      'Service SAS',
      'User delegation SAS',
      'Stored access policy SAS',
    ],
    a: 1,
    exp: 'A Service SAS delegates access to specific resources within a single storage service (Blob, File, Queue, or Table) with specified permissions and expiry. Account SAS can access multiple services and all resource types within those services.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure service is used to ship large amounts of data to Azure when internet transfer is impractical due to bandwidth or time constraints?',
    opts: [
      'Azure ExpressRoute',
      'Azure Data Box',
      'Azure File Sync',
      'Azure Storage Mover',
    ],
    a: 1,
    exp: 'Azure Data Box is a physical appliance service where Microsoft ships a ruggedized device that you load with data on-premises and ship back to Microsoft for uploading to Azure. It handles tens to hundreds of terabytes efficiently without internet transfer.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure managed disk type is designed for IO-intensive workloads such as databases and requires the lowest latency?',
    opts: [
      'Standard HDD',
      'Standard SSD',
      'Premium SSD',
      'Ultra Disk',
    ],
    a: 3,
    exp: 'Ultra Disk provides the highest performance with sub-millisecond latency, and you can dynamically adjust IOPS and throughput without restarting the VM. It is designed for the most demanding IO-intensive workloads like SAP HANA databases.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure storage feature protects blob data from accidental deletion by retaining deleted blobs for a configurable retention period?',
    opts: [
      'Blob versioning',
      'Lifecycle management',
      'Soft delete for blobs',
      'Immutability policies',
    ],
    a: 2,
    exp: 'Blob soft delete retains deleted blobs and blob versions for a configurable number of days (1–365), allowing recovery from accidental deletions. During the retention period, the blobs are marked as deleted but not permanently removed.',
  },
  {
    domain: 'Implement & Manage Storage',
    q: 'Which Azure storage networking feature restricts access to a storage account to specific Azure Virtual Networks and subnets?',
    opts: [
      'Private endpoints',
      'Storage firewall with VNet service endpoints',
      'Shared Access Signatures',
      'Storage account keys',
    ],
    a: 1,
    exp: 'Storage firewall rules combined with VNet service endpoints restrict storage account access to traffic from specified VNets and subnets, blocking all other public internet access. Private endpoints go further by giving the storage account a private IP on your VNet.',
  },

  // ─── Deploy & Manage Azure Compute ────────────────────────────────────────
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure VM feature distributes VMs across multiple physical servers within a datacenter to ensure at least one VM is available during maintenance or hardware failure?',
    opts: [
      'Availability Zones',
      'Availability Sets',
      'VM Scale Sets',
      'Proximity Placement Groups',
    ],
    a: 1,
    exp: 'Availability Sets spread VMs across multiple fault domains (separate physical racks with independent power/network) and update domains (VMs in the same UD are rebooted together during maintenance). This provides up to 99.95% SLA for multi-VM deployments.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure feature automatically increases or decreases the number of VM instances based on demand or a schedule?',
    opts: [
      'Availability Sets',
      'VM Scale Sets',
      'Proximity Placement Groups',
      'Azure Automation',
    ],
    a: 1,
    exp: 'Azure VM Scale Sets allow you to deploy and manage a group of identical, auto-scaling VMs. Based on metrics (CPU, memory) or schedules, they automatically add or remove VM instances to maintain application performance and control costs.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure VM extension executes PowerShell or shell scripts on a VM after deployment for post-deployment configuration?',
    opts: [
      'Azure Automation DSC',
      'Custom Script Extension',
      'Diagnostics Extension',
      'Network Watcher Agent',
    ],
    a: 1,
    exp: 'The Custom Script Extension downloads and executes scripts (PowerShell, Bash) on Azure VMs, making it useful for post-deployment software installation, configuration tasks, and bootstrapping. Scripts can be stored in Azure Storage or provided inline.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure App Service feature allows you to deploy a new version of an application to a staging environment and then swap it into production with zero downtime?',
    opts: [
      'Auto-scaling',
      'Custom domains',
      'Deployment slots',
      'WebJobs',
    ],
    a: 2,
    exp: 'Deployment slots allow you to deploy applications to separate named environments (staging, QA, canary) and then perform a slot swap to promote the staging version to production instantly with zero downtime. Slots also enable easy rollbacks.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure App Service Plan tier is required to use deployment slots?',
    opts: [
      'Free (F1)',
      'Shared (D1)',
      'Basic (B1)',
      'Standard (S1) or higher',
    ],
    a: 3,
    exp: 'Deployment slots are available starting with the Standard App Service Plan tier (S1 and above). Free and Shared tiers do not include deployment slots. Standard allows up to 5 slots, Premium allows up to 20.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure Functions hosting plan provides the most flexibility for long-running functions and VNet integration?',
    opts: [
      'Consumption plan',
      'Premium plan',
      'Dedicated (App Service) plan',
      'Flex Consumption plan',
    ],
    a: 1,
    exp: 'The Azure Functions Premium plan provides pre-warmed instances (eliminating cold starts), VNet integration, unlimited execution duration, and the ability to use larger instance sizes. The Consumption plan limits execution time and does not support VNet integration.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which infrastructure-as-code language is natively integrated with Azure and uses a declarative syntax with a simpler structure than ARM JSON templates?',
    opts: [
      'Terraform',
      'Ansible',
      'Bicep',
      'Pulumi',
    ],
    a: 2,
    exp: 'Bicep is a domain-specific language developed by Microsoft that transpiles to ARM JSON templates. It provides cleaner syntax, better modularity, type safety, and IntelliSense support while being fully integrated with Azure Resource Manager.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which Azure feature groups VMs in the same datacenter with very low network latency between them, ideal for HPC workloads?',
    opts: [
      'Availability Sets',
      'Availability Zones',
      'Proximity Placement Groups',
      'VM Scale Sets',
    ],
    a: 2,
    exp: 'Proximity Placement Groups ensure VMs are co-located in the same Azure datacenter, providing the lowest possible network latency between them. This is essential for latency-sensitive workloads like HPC clusters or gaming backends.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'Which deployment model for Azure Container Instances (ACI) allows containers to communicate privately using a VNet subnet?',
    opts: [
      'Public IP deployment',
      'VNet injection',
      'Service endpoints',
      'Private Link',
    ],
    a: 1,
    exp: 'ACI supports VNet injection, which deploys containers into a specified Azure Virtual Network subnet, allowing the containers to communicate privately with other resources in the VNet without exposure to the public internet.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'In Azure Kubernetes Service (AKS), which component manages the Kubernetes API server, etcd, and scheduler, and is fully managed by Microsoft?',
    opts: [
      'Worker nodes',
      'Node pools',
      'The control plane',
      'The kubelet',
    ],
    a: 2,
    exp: 'In AKS, the Kubernetes control plane (API server, scheduler, controller manager, etcd) is fully managed by Microsoft at no extra cost. Customers only manage and pay for the worker nodes that run their application workloads.',
  },
  {
    domain: 'Deploy & Manage Azure Compute',
    q: 'In an ARM template, what is the purpose of the "dependsOn" property?',
    opts: [
      'Specifies the Azure region for deployment',
      'Defines explicit deployment order between resources',
      'Sets access control for the resource',
      'Tags the resource for billing',
    ],
    a: 1,
    exp: 'The "dependsOn" property in ARM templates explicitly defines deployment ordering, ensuring a resource is not deployed until its dependencies are successfully deployed. ARM can infer implicit dependencies from reference() functions but sometimes explicit ordering is needed.',
  },

  // ─── Implement & Manage Virtual Networking ────────────────────────────────
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure networking resource filters inbound and outbound traffic to and from Azure resources using security rules based on ports and protocols?',
    opts: [
      'Azure Firewall',
      'Azure Application Gateway',
      'Network Security Group (NSG)',
      'Azure DDoS Protection',
    ],
    a: 2,
    exp: 'Network Security Groups (NSGs) contain rules that allow or deny inbound and outbound network traffic based on source/destination IP, port, and protocol. They can be associated with subnets or individual VM network interfaces.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which NSG rule property determines the processing order of rules, with lower numbers processed first?',
    opts: [
      'Direction',
      'Action',
      'Priority',
      'Protocol',
    ],
    a: 2,
    exp: 'NSG rule priority values range from 100 to 4096, with lower numbers having higher priority and being processed first. When traffic matches a rule, processing stops, so rules should be ordered from most specific (lower number) to least specific.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure DNS feature allows you to host DNS zones for name resolution within Azure Virtual Networks using private names?',
    opts: [
      'Azure DNS public zones',
      'Azure DNS private zones',
      'Custom DNS servers',
      'Azure Traffic Manager',
    ],
    a: 1,
    exp: 'Azure DNS private zones provide name resolution for VMs within Azure Virtual Networks using custom DNS names without needing a custom DNS server. Private zones can be linked to VNets for automatic registration and resolution of VM names.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which VNet peering type connects virtual networks in different Azure regions?',
    opts: [
      'Local VNet peering',
      'Global VNet peering',
      'VNet-to-VNet VPN',
      'ExpressRoute Global Reach',
    ],
    a: 1,
    exp: 'Global VNet peering connects virtual networks across different Azure regions, enabling private connectivity without requiring gateways or the public internet. Traffic travels across Microsoft\'s backbone network with low latency.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure VPN Gateway connection type connects individual clients (laptops, mobile devices) to Azure Virtual Networks remotely?',
    opts: [
      'Site-to-Site (S2S)',
      'VNet-to-VNet',
      'Point-to-Site (P2S)',
      'ExpressRoute',
    ],
    a: 2,
    exp: 'Point-to-Site (P2S) VPN connections allow individual client computers to connect securely to an Azure Virtual Network from anywhere. They are commonly used for remote workers or developers who need access to Azure resources from client devices.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure Load Balancer SKU supports Availability Zones and is required for zone-redundant deployments?',
    opts: [
      'Basic SKU',
      'Standard SKU',
      'Gateway SKU',
      'Premium SKU',
    ],
    a: 1,
    exp: 'Standard Azure Load Balancer supports Availability Zones, HTTPS health probes, and offers an SLA. Basic Load Balancer does not support Availability Zones, is free but has limited features, and is being retired in 2025.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure service distributes traffic globally to backend endpoints based on routing methods like performance, priority, or geographic location?',
    opts: [
      'Azure Application Gateway',
      'Azure Load Balancer',
      'Azure Traffic Manager',
      'Azure Front Door',
    ],
    a: 2,
    exp: 'Azure Traffic Manager is a DNS-based global traffic load balancer that distributes client requests to the most appropriate backend endpoint based on routing methods including performance, weighted, priority, geographic, and multivalue.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure Application Gateway feature inspects HTTP traffic for web application vulnerabilities like SQL injection and XSS?',
    opts: [
      'URL path-based routing',
      'SSL offload',
      'Web Application Firewall (WAF)',
      'Session affinity',
    ],
    a: 2,
    exp: 'The Web Application Firewall (WAF) on Azure Application Gateway inspects HTTP/HTTPS traffic using OWASP core rule sets to detect and block common web attacks like SQL injection, XSS, and other OWASP top 10 vulnerabilities.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure Network Watcher feature captures packet-level traffic for a VM to help diagnose network connectivity issues?',
    opts: [
      'IP flow verify',
      'Connection monitor',
      'Packet capture',
      'Next hop',
    ],
    a: 2,
    exp: 'Network Watcher Packet Capture allows you to capture network packets to and from a VM, saving them for analysis in .cap files. This helps diagnose anomalies, gather network statistics, and troubleshoot client-server communications.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure Network Watcher feature tells you the route that a packet would take from a VM to a specific destination IP address?',
    opts: [
      'IP flow verify',
      'Packet capture',
      'Connection monitor',
      'Next hop',
    ],
    a: 3,
    exp: 'The Next Hop feature in Network Watcher shows the next hop type and IP address that a packet would take from a VM to a destination, which helps verify that traffic is being routed correctly through VNet peerings, VPN gateways, or UDRs.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure Network Watcher feature verifies whether a network security group rule allows or denies traffic to or from a VM?',
    opts: [
      'Next hop',
      'Packet capture',
      'IP flow verify',
      'Flow logs',
    ],
    a: 2,
    exp: 'IP flow verify tests whether a specific packet is allowed or denied to/from a VM based on the applied NSG rules. You specify the direction, protocol, local and remote IP addresses and ports, and it tells you which rule allowed or denied the flow.',
  },
  {
    domain: 'Implement & Manage Virtual Networking',
    q: 'Which Azure feature allows you to group VMs and apply NSG rules using logical names rather than individual IP addresses?',
    opts: [
      'Network Security Groups',
      'Application Security Groups',
      'Service Tags',
      'User Defined Routes',
    ],
    a: 1,
    exp: 'Application Security Groups (ASGs) allow you to group Azure VMs and reference them by name in NSG rules. This enables you to define network security policies based on application structure rather than tracking individual IP addresses.',
  },

  // ─── Monitor & Maintain Azure Resources ───────────────────────────────────
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Azure Monitor component is used to store and query logs using the Kusto Query Language (KQL)?',
    opts: [
      'Azure Metrics',
      'Log Analytics workspace',
      'Application Insights',
      'Activity Log',
    ],
    a: 1,
    exp: 'Log Analytics workspaces store log data collected by Azure Monitor and provide a query interface using Kusto Query Language (KQL). They serve as the central repository for logs from Azure resources, VMs, and custom sources.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Azure Monitor feature notifies you or triggers an automated action when a metric exceeds a defined threshold?',
    opts: [
      'Diagnostic settings',
      'Azure Advisor',
      'Alerts and action groups',
      'Workbooks',
    ],
    a: 2,
    exp: 'Azure Monitor alerts evaluate metrics or log queries against defined conditions and trigger action groups when thresholds are breached. Action groups define the notifications (email, SMS, push) and automated actions (runbooks, Logic Apps, ITSM) to take.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Azure service provides backup and restoration capabilities for Azure VMs, Azure Files, and SQL databases in a single Recovery Services vault?',
    opts: [
      'Azure Site Recovery',
      'Azure Backup',
      'Azure Archive Storage',
      'Azure Data Box',
    ],
    a: 1,
    exp: 'Azure Backup is a cloud-based backup service that uses Recovery Services vaults to store backup data. It supports Azure VMs, Azure Files shares, SQL Server databases, SAP HANA, and on-premises servers using the MARS agent.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Azure service replicates VMs and workloads to a secondary region so they can be failed over in the event of a regional disaster?',
    opts: [
      'Azure Backup',
      'Azure Archive Storage',
      'Azure Site Recovery',
      'Azure Data Factory',
    ],
    a: 2,
    exp: 'Azure Site Recovery (ASR) is a disaster recovery service that continuously replicates VMs to a secondary Azure region. In the event of a primary region outage, you can fail over to the secondary region and fail back when the primary is restored.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Azure Monitor feature sends resource diagnostic logs (metrics, logs) to a Log Analytics workspace, Azure Storage, or Event Hub?',
    opts: [
      'Azure Advisor',
      'Diagnostic settings',
      'Action groups',
      'Azure Service Health',
    ],
    a: 1,
    exp: 'Diagnostic settings on Azure resources configure where platform logs and metrics are sent — to a Log Analytics workspace for querying, Azure Storage for long-term archiving, or Azure Event Hubs for streaming to external systems.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Azure service provides automated assessment and recommendations for managing Windows and Linux VMs, including update compliance reporting?',
    opts: [
      'Azure Advisor',
      'Azure Monitor',
      'Azure Update Manager',
      'Azure Security Center',
    ],
    a: 2,
    exp: 'Azure Update Manager (formerly Update Management in Azure Automation) provides centralized management and reporting for OS updates across Azure and on-premises VMs. It assesses patch compliance and orchestrates update deployments on schedules.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'In Azure Backup, what is the purpose of a backup policy?',
    opts: [
      'Defines who has access to backup data',
      'Specifies the backup schedule and retention periods for restore points',
      'Replicates backups to a secondary region',
      'Encrypts backup data with customer-managed keys',
    ],
    a: 1,
    exp: 'A backup policy in Azure Backup defines how frequently backups are taken (hourly, daily, weekly) and how long each recovery point is retained (daily, weekly, monthly, yearly). Multiple VMs can share the same policy for consistent backup management.',
  },
  {
    domain: 'Monitor & Maintain Azure Resources',
    q: 'Which Recovery Services vault feature ensures that backup data is replicated to a secondary region for protection against regional disasters?',
    opts: [
      'Locally redundant storage (LRS) vault',
      'Zone-redundant storage (ZRS) vault',
      'Geo-redundant storage (GRS) vault with cross-region restore',
      'Soft delete',
    ],
    a: 2,
    exp: 'Recovery Services vaults configured with Geo-Redundant Storage (GRS) replicate backup data to a paired secondary region. Cross-Region Restore (CRR) allows restoring VMs from secondary region backups even when the primary region is unavailable.',
  },

  // ── Additional AZ-104 practice questions (26 added) ──

  // ── Manage Azure Identities & Governance ──
  {
    domain: "Manage Azure Identities & Governance",
    q: "A manufacturing company modernizing IT must document Manage Azure Identities & Governance procedures for Microsoft Azure Administrator compliance. Which standard applies?",
    opts: [
      "Mix production and test manage azure identities & governance configurations in one environment",
      "Store sensitive manage azure identities & governance credentials in plain text configuration files",
      "Select the manage azure identities & governance option that meets Microsoft Azure Administrator security and governance standards",
      "Skip manage azure identities & governance testing before production rollout",
    ],
    a: 2,
    exp: "Select the manage azure identities & governance option that meets Microsoft Azure Administrator security and governance standards. This is the recommended approach for the Manage Azure Identities & Governance domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Storage ──
  {
    domain: "Implement & Manage Storage",
    q: "A Microsoft Azure Administrator instructor asks about Implement & Manage Storage in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Store sensitive implement & manage storage credentials in plain text configuration files",
      "Skip implement & manage storage testing before production rollout",
      "Implement implement & manage storage without change management or rollback plans",
      "Design implement & manage storage using patterns validated in Microsoft Azure Administrator practice assessments",
    ],
    a: 3,
    exp: "Design implement & manage storage using patterns validated in Microsoft Azure Administrator practice assessments. This is the recommended approach for the Implement & Manage Storage domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Deploy & Manage Azure Compute ──
  {
    domain: "Deploy & Manage Azure Compute",
    q: "Which Deploy & Manage Azure Compute metric best indicates Microsoft Azure Administrator readiness for a multinational enterprise?",
    opts: [
      "Apply the Microsoft Azure Administrator-aligned deploy & manage azure compute approach recommended in official exam objectives",
      "Skip deploy & manage azure compute testing before production rollout",
      "Implement deploy & manage azure compute without change management or rollback plans",
      "Use default deploy & manage azure compute settings without hardening",
    ],
    a: 0,
    exp: "Apply the Microsoft Azure Administrator-aligned deploy & manage azure compute approach recommended in official exam objectives. This is the recommended approach for the Deploy & Manage Azure Compute domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Virtual Networking ──
  {
    domain: "Implement & Manage Virtual Networking",
    q: "A regulated financial institution is troubleshooting a Implement & Manage Virtual Networking issue while preparing for Microsoft Azure Administrator. What is the first step?",
    opts: [
      "Implement implement & manage virtual networking without change management or rollback plans",
      "Follow industry best practices for implement & manage virtual networking as defined in the Microsoft Azure Administrator body of knowledge",
      "Use default implement & manage virtual networking settings without hardening",
      "Centralize all implement & manage virtual networking decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for implement & manage virtual networking as defined in the Microsoft Azure Administrator body of knowledge. This is the recommended approach for the Implement & Manage Virtual Networking domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Monitor & Maintain Azure Resources ──
  {
    domain: "Monitor & Maintain Azure Resources",
    q: "In Microsoft Azure Administrator, how should a healthcare organization handle a trade-off involving Monitor & Maintain Azure Resources?",
    opts: [
      "Use default monitor & maintain azure resources settings without hardening",
      "Centralize all monitor & maintain azure resources decisions without stakeholder review",
      "Implement the standard monitor & maintain azure resources solution that satisfies Microsoft Azure Administrator domain requirements",
      "Deprecate monitor & maintain azure resources controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard monitor & maintain azure resources solution that satisfies Microsoft Azure Administrator domain requirements. This is the recommended approach for the Monitor & Maintain Azure Resources domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Manage Azure Identities & Governance ──
  {
    domain: "Manage Azure Identities & Governance",
    q: "Which Manage Azure Identities & Governance pattern is commonly tested on Microsoft Azure Administrator for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Centralize all manage azure identities & governance decisions without stakeholder review",
      "Deprecate manage azure identities & governance controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses manage azure identities & governance policies",
      "Use the certified manage azure identities & governance methodology specified for Microsoft Azure Administrator candidates",
    ],
    a: 3,
    exp: "Use the certified manage azure identities & governance methodology specified for Microsoft Azure Administrator candidates. This is the recommended approach for the Manage Azure Identities & Governance domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Storage ──
  {
    domain: "Implement & Manage Storage",
    q: "A government agency is preparing for Microsoft Azure Administrator and must strengthen Implement & Manage Storage. Which option is BEST?",
    opts: [
      "Adopt the implement & manage storage control framework referenced in Microsoft Azure Administrator study materials",
      "Deprecate implement & manage storage controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses implement & manage storage policies",
      "Disable monitoring for implement & manage storage to improve performance",
    ],
    a: 0,
    exp: "Adopt the implement & manage storage control framework referenced in Microsoft Azure Administrator study materials. This is the recommended approach for the Implement & Manage Storage domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Deploy & Manage Azure Compute ──
  {
    domain: "Deploy & Manage Azure Compute",
    q: "During a Microsoft Azure Administrator readiness review at a SaaS startup scaling rapidly, which Deploy & Manage Azure Compute approach meets certification objectives?",
    opts: [
      "Use an undocumented workaround that bypasses deploy & manage azure compute policies",
      "Configure deploy & manage azure compute according to Microsoft Azure Administrator exam blueprint recommendations",
      "Disable monitoring for deploy & manage azure compute to improve performance",
      "Grant excessive privileges that violate deploy & manage azure compute least-privilege principles",
    ],
    a: 1,
    exp: "Configure deploy & manage azure compute according to Microsoft Azure Administrator exam blueprint recommendations. This is the recommended approach for the Deploy & Manage Azure Compute domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Virtual Networking ──
  {
    domain: "Implement & Manage Virtual Networking",
    q: "A consultant advising a manufacturing company modernizing IT on Microsoft Azure Administrator recommends improvements to Implement & Manage Virtual Networking. What should they implement?",
    opts: [
      "Disable monitoring for implement & manage virtual networking to improve performance",
      "Grant excessive privileges that violate implement & manage virtual networking least-privilege principles",
      "Select the implement & manage virtual networking option that meets Microsoft Azure Administrator security and governance standards",
      "Rely solely on manual processes with no implement & manage virtual networking automation",
    ],
    a: 2,
    exp: "Select the implement & manage virtual networking option that meets Microsoft Azure Administrator security and governance standards. This is the recommended approach for the Implement & Manage Virtual Networking domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Monitor & Maintain Azure Resources ──
  {
    domain: "Monitor & Maintain Azure Resources",
    q: "Which Monitor & Maintain Azure Resources strategy is MOST appropriate when a media company with global users adopts Microsoft Azure Administrator standards?",
    opts: [
      "Grant excessive privileges that violate monitor & maintain azure resources least-privilege principles",
      "Rely solely on manual processes with no monitor & maintain azure resources automation",
      "Ignore monitor & maintain azure resources compliance requirements for faster deployment",
      "Design monitor & maintain azure resources using patterns validated in Microsoft Azure Administrator practice assessments",
    ],
    a: 3,
    exp: "Design monitor & maintain azure resources using patterns validated in Microsoft Azure Administrator practice assessments. This is the recommended approach for the Monitor & Maintain Azure Resources domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Manage Azure Identities & Governance ──
  {
    domain: "Manage Azure Identities & Governance",
    q: "An audit of a multinational enterprise reveals gaps in Manage Azure Identities & Governance for Microsoft Azure Administrator. Which remediation is CORRECT?",
    opts: [
      "Apply the Microsoft Azure Administrator-aligned manage azure identities & governance approach recommended in official exam objectives",
      "Rely solely on manual processes with no manage azure identities & governance automation",
      "Ignore manage azure identities & governance compliance requirements for faster deployment",
      "Mix production and test manage azure identities & governance configurations in one environment",
    ],
    a: 0,
    exp: "Apply the Microsoft Azure Administrator-aligned manage azure identities & governance approach recommended in official exam objectives. This is the recommended approach for the Manage Azure Identities & Governance domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Storage ──
  {
    domain: "Implement & Manage Storage",
    q: "A regulated financial institution is designing a Microsoft Azure Administrator study plan focused on Implement & Manage Storage. Which resource topic is essential?",
    opts: [
      "Ignore implement & manage storage compliance requirements for faster deployment",
      "Follow industry best practices for implement & manage storage as defined in the Microsoft Azure Administrator body of knowledge",
      "Mix production and test implement & manage storage configurations in one environment",
      "Store sensitive implement & manage storage credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for implement & manage storage as defined in the Microsoft Azure Administrator body of knowledge. This is the recommended approach for the Implement & Manage Storage domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Deploy & Manage Azure Compute ──
  {
    domain: "Deploy & Manage Azure Compute",
    q: "When a healthcare organization implements Microsoft Azure Administrator controls for Deploy & Manage Azure Compute, which practice reduces operational risk?",
    opts: [
      "Mix production and test deploy & manage azure compute configurations in one environment",
      "Store sensitive deploy & manage azure compute credentials in plain text configuration files",
      "Implement the standard deploy & manage azure compute solution that satisfies Microsoft Azure Administrator domain requirements",
      "Skip deploy & manage azure compute testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard deploy & manage azure compute solution that satisfies Microsoft Azure Administrator domain requirements. This is the recommended approach for the Deploy & Manage Azure Compute domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Virtual Networking ──
  {
    domain: "Implement & Manage Virtual Networking",
    q: "A Microsoft Azure Administrator practice exam scenario covers Implement & Manage Virtual Networking for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive implement & manage virtual networking credentials in plain text configuration files",
      "Skip implement & manage virtual networking testing before production rollout",
      "Implement implement & manage virtual networking without change management or rollback plans",
      "Use the certified implement & manage virtual networking methodology specified for Microsoft Azure Administrator candidates",
    ],
    a: 3,
    exp: "Use the certified implement & manage virtual networking methodology specified for Microsoft Azure Administrator candidates. This is the recommended approach for the Implement & Manage Virtual Networking domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Monitor & Maintain Azure Resources ──
  {
    domain: "Monitor & Maintain Azure Resources",
    q: "Which Monitor & Maintain Azure Resources principle is emphasized in Microsoft Azure Administrator when supporting a government agency?",
    opts: [
      "Adopt the monitor & maintain azure resources control framework referenced in Microsoft Azure Administrator study materials",
      "Skip monitor & maintain azure resources testing before production rollout",
      "Implement monitor & maintain azure resources without change management or rollback plans",
      "Use default monitor & maintain azure resources settings without hardening",
    ],
    a: 0,
    exp: "Adopt the monitor & maintain azure resources control framework referenced in Microsoft Azure Administrator study materials. This is the recommended approach for the Monitor & Maintain Azure Resources domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Manage Azure Identities & Governance ──
  {
    domain: "Manage Azure Identities & Governance",
    q: "A SaaS startup scaling rapidly failed a mock Microsoft Azure Administrator question on Manage Azure Identities & Governance. What concept should they review?",
    opts: [
      "Implement manage azure identities & governance without change management or rollback plans",
      "Configure manage azure identities & governance according to Microsoft Azure Administrator exam blueprint recommendations",
      "Use default manage azure identities & governance settings without hardening",
      "Centralize all manage azure identities & governance decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure manage azure identities & governance according to Microsoft Azure Administrator exam blueprint recommendations. This is the recommended approach for the Manage Azure Identities & Governance domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Storage ──
  {
    domain: "Implement & Manage Storage",
    q: "For Microsoft Azure Administrator certification, Implement & Manage Storage knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Use default implement & manage storage settings without hardening",
      "Centralize all implement & manage storage decisions without stakeholder review",
      "Select the implement & manage storage option that meets Microsoft Azure Administrator security and governance standards",
      "Deprecate implement & manage storage controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the implement & manage storage option that meets Microsoft Azure Administrator security and governance standards. This is the recommended approach for the Implement & Manage Storage domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Deploy & Manage Azure Compute ──
  {
    domain: "Deploy & Manage Azure Compute",
    q: "A team at a media company with global users debates Deploy & Manage Azure Compute options while studying Microsoft Azure Administrator. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all deploy & manage azure compute decisions without stakeholder review",
      "Deprecate deploy & manage azure compute controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses deploy & manage azure compute policies",
      "Design deploy & manage azure compute using patterns validated in Microsoft Azure Administrator practice assessments",
    ],
    a: 3,
    exp: "Design deploy & manage azure compute using patterns validated in Microsoft Azure Administrator practice assessments. This is the recommended approach for the Deploy & Manage Azure Compute domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Virtual Networking ──
  {
    domain: "Implement & Manage Virtual Networking",
    q: "Which Implement & Manage Virtual Networking capability is validated by Microsoft Azure Administrator for organizations such as a multinational enterprise?",
    opts: [
      "Apply the Microsoft Azure Administrator-aligned implement & manage virtual networking approach recommended in official exam objectives",
      "Deprecate implement & manage virtual networking controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses implement & manage virtual networking policies",
      "Disable monitoring for implement & manage virtual networking to improve performance",
    ],
    a: 0,
    exp: "Apply the Microsoft Azure Administrator-aligned implement & manage virtual networking approach recommended in official exam objectives. This is the recommended approach for the Implement & Manage Virtual Networking domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Monitor & Maintain Azure Resources ──
  {
    domain: "Monitor & Maintain Azure Resources",
    q: "When evaluating Monitor & Maintain Azure Resources tools for Microsoft Azure Administrator, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Use an undocumented workaround that bypasses monitor & maintain azure resources policies",
      "Follow industry best practices for monitor & maintain azure resources as defined in the Microsoft Azure Administrator body of knowledge",
      "Disable monitoring for monitor & maintain azure resources to improve performance",
      "Grant excessive privileges that violate monitor & maintain azure resources least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for monitor & maintain azure resources as defined in the Microsoft Azure Administrator body of knowledge. This is the recommended approach for the Monitor & Maintain Azure Resources domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Manage Azure Identities & Governance ──
  {
    domain: "Manage Azure Identities & Governance",
    q: "A healthcare organization must document Manage Azure Identities & Governance procedures for Microsoft Azure Administrator compliance. Which standard applies?",
    opts: [
      "Disable monitoring for manage azure identities & governance to improve performance",
      "Grant excessive privileges that violate manage azure identities & governance least-privilege principles",
      "Implement the standard manage azure identities & governance solution that satisfies Microsoft Azure Administrator domain requirements",
      "Rely solely on manual processes with no manage azure identities & governance automation",
    ],
    a: 2,
    exp: "Implement the standard manage azure identities & governance solution that satisfies Microsoft Azure Administrator domain requirements. This is the recommended approach for the Manage Azure Identities & Governance domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Storage ──
  {
    domain: "Implement & Manage Storage",
    q: "A Microsoft Azure Administrator instructor asks about Implement & Manage Storage in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate implement & manage storage least-privilege principles",
      "Rely solely on manual processes with no implement & manage storage automation",
      "Ignore implement & manage storage compliance requirements for faster deployment",
      "Use the certified implement & manage storage methodology specified for Microsoft Azure Administrator candidates",
    ],
    a: 3,
    exp: "Use the certified implement & manage storage methodology specified for Microsoft Azure Administrator candidates. This is the recommended approach for the Implement & Manage Storage domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Deploy & Manage Azure Compute ──
  {
    domain: "Deploy & Manage Azure Compute",
    q: "Which Deploy & Manage Azure Compute metric best indicates Microsoft Azure Administrator readiness for a government agency?",
    opts: [
      "Adopt the deploy & manage azure compute control framework referenced in Microsoft Azure Administrator study materials",
      "Rely solely on manual processes with no deploy & manage azure compute automation",
      "Ignore deploy & manage azure compute compliance requirements for faster deployment",
      "Mix production and test deploy & manage azure compute configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the deploy & manage azure compute control framework referenced in Microsoft Azure Administrator study materials. This is the recommended approach for the Deploy & Manage Azure Compute domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Implement & Manage Virtual Networking ──
  {
    domain: "Implement & Manage Virtual Networking",
    q: "A SaaS startup scaling rapidly is troubleshooting a Implement & Manage Virtual Networking issue while preparing for Microsoft Azure Administrator. What is the first step?",
    opts: [
      "Ignore implement & manage virtual networking compliance requirements for faster deployment",
      "Configure implement & manage virtual networking according to Microsoft Azure Administrator exam blueprint recommendations",
      "Mix production and test implement & manage virtual networking configurations in one environment",
      "Store sensitive implement & manage virtual networking credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure implement & manage virtual networking according to Microsoft Azure Administrator exam blueprint recommendations. This is the recommended approach for the Implement & Manage Virtual Networking domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Monitor & Maintain Azure Resources ──
  {
    domain: "Monitor & Maintain Azure Resources",
    q: "In Microsoft Azure Administrator, how should a manufacturing company modernizing IT handle a trade-off involving Monitor & Maintain Azure Resources?",
    opts: [
      "Mix production and test monitor & maintain azure resources configurations in one environment",
      "Store sensitive monitor & maintain azure resources credentials in plain text configuration files",
      "Select the monitor & maintain azure resources option that meets Microsoft Azure Administrator security and governance standards",
      "Skip monitor & maintain azure resources testing before production rollout",
    ],
    a: 2,
    exp: "Select the monitor & maintain azure resources option that meets Microsoft Azure Administrator security and governance standards. This is the recommended approach for the Monitor & Maintain Azure Resources domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },

  // ── Manage Azure Identities & Governance ──
  {
    domain: "Manage Azure Identities & Governance",
    q: "Which Manage Azure Identities & Governance pattern is commonly tested on Microsoft Azure Administrator for scenarios involving a media company with global users?",
    opts: [
      "Store sensitive manage azure identities & governance credentials in plain text configuration files",
      "Skip manage azure identities & governance testing before production rollout",
      "Implement manage azure identities & governance without change management or rollback plans",
      "Design manage azure identities & governance using patterns validated in Microsoft Azure Administrator practice assessments",
    ],
    a: 3,
    exp: "Design manage azure identities & governance using patterns validated in Microsoft Azure Administrator practice assessments. This is the recommended approach for the Manage Azure Identities & Governance domain on the Microsoft Azure Administrator exam and reflects current certification objectives.",
  },
];
