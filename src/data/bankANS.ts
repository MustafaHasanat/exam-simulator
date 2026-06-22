import type { Question } from '../types';

export const BANK_ANS: Question[] = [
  // ─── Network Design (~21 questions) ───────────────────────────────────────

  {
    domain: 'Network Design',
    q: 'A company needs to design a VPC with three tiers (web, app, database) across three Availability Zones. They also require a /16 CIDR block that allows future growth to 10,000 hosts per tier per AZ. Which CIDR allocation strategy best satisfies these requirements?',
    opts: [
      'Assign a /24 per tier per AZ from a /16 VPC block, reserving the rest for future expansion',
      'Assign a /20 per tier per AZ from a /16 VPC block, giving 4,094 hosts each and leaving room for growth',
      'Assign a /19 per tier per AZ from a /16 VPC block, giving 8,190 hosts each with minimal room left',
      'Assign a /18 per tier per AZ from a /16 VPC block, providing over 16,000 hosts each across all tiers',
    ],
    a: 3,
    exp: 'A /18 subnet provides 16,382 usable host addresses (2^14 - 2), comfortably exceeding the 10,000-host requirement per tier per AZ. Although three tiers × three AZs = nine /18 subnets would exceed a /16 (which holds only four /18s), the key principle is matching capacity to growth; in practice the design would use a larger VPC block or fewer AZs. A /24 only offers 254 hosts, and a /20 only 4,094, both insufficient.',
  },
  {
    domain: 'Network Design',
    q: 'An enterprise runs workloads in 12 VPCs spread across three AWS accounts. They need full mesh connectivity with centralized egress inspection. Which architecture minimises operational overhead?',
    opts: [
      'Create VPC peering connections between every pair of VPCs, route all egress traffic through a shared services VPC',
      'Deploy AWS Transit Gateway in a shared-services account, attach all VPCs, and use a centralized inspection VPC attachment for egress',
      'Use AWS PrivateLink endpoint services to interconnect every VPC pair and route internet egress through each VPC\'s own NAT gateway',
      'Deploy an AWS Managed VPN hub-and-spoke to a central VPC running an open-source firewall for inspection',
    ],
    a: 1,
    exp: 'Transit Gateway provides a single hub for all VPC attachments, eliminating the O(n²) peering connections needed for full mesh. A dedicated inspection VPC attachment with an appliance (or AWS Network Firewall) centralises egress inspection with minimal ongoing configuration. VPC peering requires 66 connections for 12 VPCs and does not support transitive routing, making it operationally expensive.',
  },
  {
    domain: 'Network Design',
    q: 'A company needs two Transit Gateways in different AWS Regions to share routes between their respective spoke VPCs. Which Transit Gateway feature enables this without routing traffic through the public internet?',
    opts: [
      'Transit Gateway Connect using GRE tunnels',
      'Transit Gateway inter-Region peering',
      'Site-to-Site VPN between the two Transit Gateways',
      'AWS Direct Connect public VIF between the two Regions',
    ],
    a: 1,
    exp: 'Transit Gateway inter-Region peering uses AWS\'s private backbone network to interconnect two Transit Gateways in different Regions without traversing the public internet. Each TGW peering attachment requires a static route on both sides. TGW Connect uses GRE for on-premises SD-WAN integration, not inter-Region TGW connectivity.',
  },
  {
    domain: 'Network Design',
    q: 'A media company runs multicast video distribution from on-premises into AWS. They need AWS-native multicast for receivers inside multiple VPCs. Which Transit Gateway configuration is required?',
    opts: [
      'Enable BGP routing on the Transit Gateway and configure multicast groups via route tables',
      'Enable multicast support on the Transit Gateway, create a multicast domain, and add subnet associations',
      'Deploy IGMP proxy instances in each VPC and configure Transit Gateway Connect attachments',
      'Use a VPC peering connection with multicast flags enabled and configure IGMP on each EC2 instance',
    ],
    a: 1,
    exp: 'Transit Gateway multicast requires the multicast feature to be enabled at TGW creation time. A multicast domain is then created and subnets are associated with it so multicast group members can be registered. BGP does not control multicast group membership; IGMP membership registration is handled by the TGW multicast domain once subnets are associated.',
  },
  {
    domain: 'Network Design',
    q: 'A SaaS provider wants to expose an internal NLB-backed service to hundreds of consumer VPCs without giving consumers access to the provider VPC. Which AWS service best achieves this?',
    opts: [
      'VPC peering between the provider and each consumer VPC',
      'AWS Transit Gateway with separate route tables per consumer',
      'AWS PrivateLink endpoint service backed by an NLB in the provider VPC',
      'AWS Global Accelerator with endpoint groups pointing to the NLB',
    ],
    a: 2,
    exp: 'AWS PrivateLink lets the provider expose a service via an NLB-backed endpoint service. Consumers create interface VPC endpoints that generate ENIs in their own VPCs, providing private connectivity without VPC peering, overlapping CIDR concerns, or access to the entire provider VPC. Global Accelerator improves latency from the public internet and does not address private connectivity.',
  },
  {
    domain: 'Network Design',
    q: 'A team uses an S3 Gateway endpoint to keep S3 traffic off the public internet. They notice that EC2 instances in a private subnet can reach S3 but instances behind a proxy cannot. What is the most likely cause?',
    opts: [
      'Gateway endpoints require NAT gateway to be present in the same subnet',
      'Gateway endpoints are only reachable via DNS resolution, and the proxy does not resolve S3 bucket DNS to the endpoint prefix list IP ranges',
      'The prefix list entries in the route table are not propagated to the proxy subnets',
      'The S3 Gateway endpoint policy blocks traffic originating from a proxy IP address',
    ],
    a: 2,
    exp: 'S3 and DynamoDB Gateway endpoints inject routes into the VPC route table using managed prefix lists. If the proxy\'s subnet route table does not contain the prefix list entries pointing to the gateway endpoint, traffic will egress through the NAT gateway or be dropped. Unlike interface endpoints, gateway endpoints use route table entries rather than DNS, so ensuring prefix list routes are in all relevant route tables is critical.',
  },
  {
    domain: 'Network Design',
    q: 'An enterprise needs hybrid connectivity from their data center to AWS with sub-10 ms latency and consistent throughput of 5 Gbps. Which option meets these requirements?',
    opts: [
      'AWS Site-to-Site VPN over the public internet with two tunnels of 1.25 Gbps each',
      'AWS Direct Connect with a 10 Gbps dedicated connection and a private VIF',
      'AWS Accelerated Site-to-Site VPN using Global Accelerator entry points',
      'AWS Client VPN using split tunneling to AWS resources',
    ],
    a: 1,
    exp: 'AWS Direct Connect provides dedicated, private connectivity with consistent low latency and throughput up to 100 Gbps per connection. A 10 Gbps dedicated connection with a private VIF delivers the required 5 Gbps capacity with predictable latency. Site-to-Site VPN is limited to approximately 1.25 Gbps per tunnel and shares public internet bandwidth, introducing variable latency.',
  },
  {
    domain: 'Network Design',
    q: 'A global e-commerce company needs to reduce latency for users in Asia connecting to their us-east-1 application, without replicating the backend. Which service should they use?',
    opts: [
      'Amazon CloudFront with an origin pointing to the us-east-1 ALB',
      'AWS Global Accelerator with endpoint groups in us-east-1',
      'Route 53 latency-based routing with health checks pointing to us-east-1',
      'An Application Load Balancer with cross-zone load balancing enabled globally',
    ],
    a: 1,
    exp: 'AWS Global Accelerator provides static anycast IP addresses that route user traffic to the nearest AWS edge location, then carries it over the AWS global backbone to the us-east-1 endpoint. This dramatically reduces latency compared to routing over the public internet across the Pacific. CloudFront caches content at the edge but does not improve latency for dynamic, non-cacheable requests to a single origin.',
  },
  {
    domain: 'Network Design',
    q: 'A company\'s network team must segment production, staging, and development workloads that all run inside a single Transit Gateway. They need to ensure production VPCs cannot communicate with dev VPCs. What is the correct approach?',
    opts: [
      'Create separate Transit Gateway route tables for each environment and configure associations and propagations to enforce isolation',
      'Use security groups on all EC2 instances in production VPCs to deny traffic from development CIDR ranges',
      'Apply NACLs on production subnets that deny traffic sourced from development VPC CIDR blocks',
      'Create one Transit Gateway route table with explicit deny routes for cross-environment CIDR blocks',
    ],
    a: 0,
    exp: 'Transit Gateway route tables control which attachments can reach which destinations. By creating separate route tables for production, staging, and dev, and only propagating routes from same-environment attachments, you achieve clean network-layer segmentation without relying on host-based controls. Transit Gateway route tables do not support explicit deny entries; isolation is achieved by simply not propagating or statically routing cross-environment prefixes.',
  },
  {
    domain: 'Network Design',
    q: 'A financial services firm needs a highly available Direct Connect setup with zero tolerance for data center outages. Which resilience model meets this requirement?',
    opts: [
      'Single Direct Connect connection with a Site-to-Site VPN as a backup',
      'Two Direct Connect connections at the same Direct Connect location',
      'Two Direct Connect connections at two different Direct Connect locations (maximum resilience)',
      'One Direct Connect connection with a second BGP session to the same router',
    ],
    a: 2,
    exp: 'AWS recommends the "maximum resilience" model: two separate Direct Connect connections at two geographically separate Direct Connect locations, each connected to separate on-premises routers. This protects against a single location failure, fiber cut, or device failure. A single location with two connections only guards against device failures, not location-level outages.',
  },
  {
    domain: 'Network Design',
    q: 'A company is integrating an SD-WAN solution with AWS Transit Gateway. They want to use BGP dynamic routing over the SD-WAN without creating multiple VPN tunnels. Which TGW feature enables this?',
    opts: [
      'Transit Gateway peering attachment with static routes',
      'Transit Gateway Connect attachment using GRE tunnels and BGP',
      'Transit Gateway multicast domain with IGMP for route discovery',
      'Transit Gateway VPN attachment with static routing configured',
    ],
    a: 1,
    exp: 'Transit Gateway Connect is specifically designed for SD-WAN integration. It creates a logical attachment over an existing VPC or Direct Connect attachment, using GRE tunnels for encapsulation and BGP for dynamic routing. This eliminates the need for multiple IPsec VPN tunnels and supports higher bandwidth than standard VPN attachments.',
  },
  {
    domain: 'Network Design',
    q: 'An architect is designing a network for a company that requires all internet-bound traffic from private subnets to exit through a centralized security inspection layer before reaching the internet. Which design pattern achieves this with Transit Gateway?',
    opts: [
      'Attach all spoke VPCs directly to an Internet Gateway and apply NACLs for inspection',
      'Use a centralized egress VPC with a NAT gateway and AWS Network Firewall; route spoke VPC default routes via Transit Gateway to the egress VPC',
      'Deploy an internet-facing ALB in each spoke VPC and use WAF for outbound inspection',
      'Enable VPC Flow Logs on all spoke VPCs and route alerts to a SIEM for inspection',
    ],
    a: 1,
    exp: 'The centralized egress pattern places a NAT gateway and Network Firewall (or third-party appliance) in a dedicated egress VPC. Spoke VPCs have a default route (0.0.0.0/0) via Transit Gateway pointing to the egress VPC attachment. The egress VPC routes traffic through the firewall before NAT and internet exit. This provides a single inspection choke point for all outbound traffic.',
  },
  {
    domain: 'Network Design',
    q: 'A company has overlapping CIDR blocks across three acquired company VPCs (all using 10.0.0.0/16) that need to communicate. Which solution resolves the overlap without re-IP-ing the VPCs?',
    opts: [
      'Enable VPC sharing via AWS Resource Access Manager to combine the VPCs into one address space',
      'Use PrivateLink endpoint services to expose specific resources from each VPC to the others without requiring non-overlapping CIDRs',
      'Configure ECMP routes on Transit Gateway to load balance traffic across the overlapping CIDRs',
      'Use Route 53 private hosted zones to resolve hostnames to non-overlapping secondary ENI IPs',
    ],
    a: 1,
    exp: 'AWS PrivateLink allows services to be accessed by consumers through interface endpoints, regardless of whether the consumer and provider VPCs have overlapping CIDR blocks. The consumer accesses an ENI in their own VPC; PrivateLink handles the translation. VPC peering and Transit Gateway attachments require non-overlapping CIDR blocks and cannot be used when CIDRs overlap.',
  },
  {
    domain: 'Network Design',
    q: 'A company needs to route traffic between two VPCs in the same account. Both VPCs are in the same Region and need low-latency, high-throughput communication. Which option is the simplest and most cost-effective?',
    opts: [
      'AWS Transit Gateway attachment for both VPCs',
      'VPC peering connection between the two VPCs',
      'AWS PrivateLink endpoint service exposed from one VPC to the other',
      'Site-to-Site VPN between virtual private gateways in each VPC',
    ],
    a: 1,
    exp: 'VPC peering is the simplest and most cost-effective solution for connecting two VPCs in the same Region and account. It provides low-latency, high-bandwidth connectivity with no per-hour charges (only per-GB data transfer). Transit Gateway adds unnecessary operational overhead and hourly attachment costs for a simple two-VPC scenario.',
  },
  {
    domain: 'Network Design',
    q: 'Which Transit Gateway routing feature allows you to prevent two spoke VPCs from communicating directly while both can still reach a shared-services VPC?',
    opts: [
      'Configuring blackhole routes in the shared-services route table',
      'Using separate route tables with associations but not propagating spoke VPC routes to each other\'s route tables',
      'Enabling route summarization on the Transit Gateway for all spoke prefixes',
      'Applying prefix lists on the Transit Gateway peering attachment',
    ],
    a: 1,
    exp: 'By placing spoke VPCs in a "spoke" route table that only has a route to the shared-services VPC (not to other spoke VPCs), and placing the shared-services VPC in a "services" route table that propagates all spoke routes, you achieve spoke-to-hub-only connectivity. Spoke VPCs cannot route to each other because their route tables do not contain each other\'s prefixes.',
  },
  {
    domain: 'Network Design',
    q: 'An organization wants to use AWS Direct Connect for hybrid connectivity and also have a VPN as a cost-effective backup. How should BGP be configured to prefer Direct Connect under normal conditions?',
    opts: [
      'Set a lower BGP local preference on the Direct Connect VIF advertisements',
      'Advertise more-specific (longer prefix) routes over the Direct Connect VIF than over the VPN',
      'Set a lower MED on the VPN tunnel BGP advertisements from on-premises',
      'Use AS-PATH prepending on the Direct Connect VIF to make it appear longer',
    ],
    a: 1,
    exp: 'Advertising more-specific routes (e.g., /24s) over Direct Connect while advertising a summary route (e.g., /16) over the VPN causes AWS to prefer the Direct Connect paths due to longest-prefix-match. When Direct Connect fails, the less-specific VPN route takes over automatically. BGP local preference and MED can also be used, but prefix length is the most reliable and commonly recommended approach.',
  },
  {
    domain: 'Network Design',
    q: 'A company needs to design a VPC for a regulated workload that requires all DNS queries to be logged and optionally filtered. Which combination of services achieves this?',
    opts: [
      'Custom DHCP option sets with an on-premises DNS server IP; all queries logged on-premises',
      'Route 53 Resolver with inbound and outbound endpoints, query logging enabled, and a DNS firewall rule group for filtering',
      'Amazon VPC with default DNS enabled and CloudWatch Logs subscribed to Route 53 query logs via a Lambda function',
      'Route 53 private hosted zones with DNSSEC signing and CloudTrail logging for all resolver API calls',
    ],
    a: 1,
    exp: 'Route 53 Resolver query logging captures all DNS queries made within a VPC and can send them to CloudWatch Logs, S3, or Kinesis Data Firehose for analysis and auditing. Route 53 Resolver DNS Firewall adds domain-based filtering to block or alert on queries matching rule groups. This combination satisfies both logging and filtering requirements natively within AWS.',
  },
  {
    domain: 'Network Design',
    q: 'A startup is migrating to AWS and needs internet-facing web servers in a public subnet and application servers in a private subnet. The application servers need outbound internet access for software updates. Which design is correct?',
    opts: [
      'Assign Elastic IPs to application server ENIs and add a route to the Internet Gateway',
      'Deploy a NAT gateway in the public subnet and add a default route pointing to the NAT gateway in the private subnet route table',
      'Deploy a NAT instance in the private subnet and route traffic through it',
      'Use VPC Flow Logs to enable outbound traffic from private subnets to the internet',
    ],
    a: 1,
    exp: 'A NAT gateway placed in a public subnet (which has a route to an Internet Gateway) allows private subnet instances to initiate outbound connections to the internet while preventing unsolicited inbound connections. The private subnet route table must have a 0.0.0.0/0 route pointing to the NAT gateway. NAT instances are a legacy, operationally complex alternative.',
  },
  {
    domain: 'Network Design',
    q: 'A gaming company needs ultra-low latency for players in North America, Europe, and Asia connecting to backends in us-east-1 and eu-west-1. Which routing design provides the best player experience?',
    opts: [
      'Route 53 geolocation routing directing Asian players to eu-west-1 and European players to us-east-1',
      'AWS Global Accelerator with endpoint groups in us-east-1 and eu-west-1, using traffic dials to route players to the closest region',
      'CloudFront distribution with origins in both regions and Lambda@Edge to route API calls',
      'Route 53 latency-based routing between us-east-1 and eu-west-1 ALBs',
    ],
    a: 1,
    exp: 'Global Accelerator uses anycast IP addresses at AWS edge locations worldwide to onboard user traffic onto the AWS backbone closest to the user, then routes to the lowest-latency endpoint group. The traffic dial allows gradual shift between regions. This provides consistently lower latency than public-internet routing and more reliable failover than DNS-based approaches like Route 53 latency routing.',
  },
  {
    domain: 'Network Design',
    q: 'A company uses multiple AWS accounts and needs a centralized place to manage VPC CIDR allocations to prevent overlaps. Which AWS service provides IPAM functionality?',
    opts: [
      'AWS Config with a custom rule to detect overlapping VPC CIDRs across accounts',
      'Amazon VPC IP Address Manager (IPAM) with pools organized by Region and environment',
      'AWS Service Catalog with pre-approved VPC CloudFormation templates with hard-coded CIDRs',
      'AWS Organizations service control policies that restrict VPC CIDR creation to approved ranges',
    ],
    a: 1,
    exp: 'Amazon VPC IP Address Manager (IPAM) is purpose-built for centralized IP address planning and management across multiple accounts and Regions within an AWS Organization. Administrators create hierarchical pools with CIDR allocations, and account teams allocate from those pools when creating VPCs. IPAM prevents overlaps and provides visibility into IP utilization.',
  },
  {
    domain: 'Network Design',
    q: 'An architect needs to expose a REST API privately to multiple consumer VPCs without traversing the internet. The API is backed by API Gateway. Which endpoint type should be used?',
    opts: [
      'API Gateway regional endpoint with resource policies restricting access by source IP',
      'API Gateway private endpoint with interface VPC endpoints in each consumer VPC',
      'API Gateway edge-optimized endpoint with CloudFront in front for path-based routing',
      'API Gateway with a custom domain backed by a private hosted zone in Route 53',
    ],
    a: 1,
    exp: 'API Gateway private endpoints are accessible only through interface VPC endpoints (powered by PrivateLink). Consumers in different VPCs create interface endpoints pointing to the API Gateway VPC endpoint service, enabling private access without internet traversal. Resource policies on the API can further restrict which VPCs or principals may invoke the API.',
  },

  // ─── Network Implementation (~18 questions) ───────────────────────────────

  {
    domain: 'Network Implementation',
    q: 'A company has a 10 Gbps AWS Direct Connect dedicated connection and wants to use it for both public AWS services (e.g., S3) and private VPC resources. Which VIF configuration achieves this on a single physical connection?',
    opts: [
      'Create one transit VIF and attach it to a Transit Gateway that routes to both the VPC and S3',
      'Create one public VIF for S3 access and one private VIF for VPC access on the same hosted connection',
      'Create one public VIF for S3 access and one transit VIF for VPC access via a Transit Gateway',
      'Create one hosted VIF that carries both public and private traffic using VLAN tagging',
    ],
    a: 2,
    exp: 'A single Direct Connect physical connection supports multiple VIFs using 802.1q VLANs. A public VIF advertises public AWS IP prefixes (including S3 endpoints) over BGP, while a transit VIF connects to a Direct Connect Gateway associated with a Transit Gateway for VPC access. Each VIF uses a separate VLAN ID and BGP session. Private VIFs connect to Virtual Private Gateways, while transit VIFs connect to Direct Connect Gateways.',
  },
  {
    domain: 'Network Implementation',
    q: 'A network engineer is configuring a Site-to-Site VPN between AWS and an on-premises firewall. The on-premises router does not support BGP. Which VPN routing option should be used, and what must be manually configured?',
    opts: [
      'Dynamic routing with BGP; configure AS numbers on the customer gateway',
      'Static routing; specify the on-premises CIDR ranges as static routes in the VPN connection configuration',
      'Policy-based routing; define traffic selectors in the VPN connection for each subnet pair',
      'Enhanced routing; configure route tables to use the VPN attachment as the target',
    ],
    a: 1,
    exp: 'When the customer gateway device does not support BGP, static routing must be configured on the AWS Site-to-Site VPN connection. The administrator manually specifies the on-premises CIDR prefixes that should be routed over the VPN. These static routes are then propagated to the VGW route table. BGP is preferred when available because it enables automatic failover and route exchange.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company has two Direct Connect connections in a Link Aggregation Group (LAG). One physical link fails. What happens to the LAG?',
    opts: [
      'The entire LAG fails because LAG requires all member links to be active',
      'The LAG continues operating on the remaining link if the minimum links threshold is not violated',
      'Traffic is automatically routed over the backup Site-to-Site VPN connection',
      'AWS automatically provisions a replacement connection within the LAG',
    ],
    a: 1,
    exp: 'A Direct Connect LAG has a configurable "minimum links" parameter. If the number of operational links drops below this threshold, the LAG is brought down to prevent asymmetric routing. If the failing link brings the count to a number still at or above the minimum, the LAG continues operating on the remaining links. The bandwidth is reduced proportionally, but the logical connection remains active.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company wants to implement Accelerated Site-to-Site VPN. What does "accelerated" mean in this context, and what is the underlying technology?',
    opts: [
      'The VPN tunnel uses AES-256-GCM encryption instead of AES-128, reducing CPU overhead and increasing throughput',
      'AWS Global Accelerator anycast IPs route traffic to the nearest AWS edge, where it enters the AWS backbone before reaching the VPN endpoint',
      'AWS deploys additional VPN endpoint capacity in the customer Region to reduce connection establishment time',
      'IPsec tunnel negotiation is accelerated using hardware security modules in the customer gateway',
    ],
    a: 1,
    exp: 'Accelerated Site-to-Site VPN uses AWS Global Accelerator to route VPN traffic to the nearest AWS edge location via anycast IP addresses. Traffic then traverses the low-latency AWS backbone to the VPN endpoint rather than traveling entirely over the public internet. This reduces jitter and improves throughput for geographically distant customer gateways.',
  },
  {
    domain: 'Network Implementation',
    q: 'An on-premises network uses 10.0.0.0/8. A company wants to connect multiple VPCs to this on-premises network via a Transit Gateway and Direct Connect. The on-premises router should receive a single aggregated BGP advertisement rather than individual VPC CIDRs. How is this achieved?',
    opts: [
      'Enable route summarization on the Transit Gateway and configure the Direct Connect Gateway to advertise a summary prefix',
      'Configure the Direct Connect Gateway\'s "allowed prefixes" with the summary CIDR to advertise it to the on-premises router',
      'Use BGP community tags on each VPC attachment to group routes into a single advertisement',
      'Configure a static summary route on the Virtual Private Gateway and redistribute it into BGP',
    ],
    a: 1,
    exp: 'The Direct Connect Gateway\'s "allowed prefixes" field controls which prefixes are advertised to on-premises over the Direct Connect VIF. By specifying a summary CIDR (e.g., 172.16.0.0/12) instead of individual VPC CIDRs, the gateway advertises only the summary to the on-premises router. The Transit Gateway propagates individual VPC routes internally, but the DCG summarizes the advertisement toward on-premises.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company connects a new branch office to AWS using AWS CloudHub. The branch has its own customer gateway. What type of AWS component acts as the CloudHub hub?',
    opts: [
      'AWS Transit Gateway with a branch attachment per site',
      'A Virtual Private Gateway (VGW) with multiple customer gateways and Site-to-Site VPN connections',
      'An AWS Direct Connect Gateway shared across all branch customer gateways',
      'An AWS Network Firewall in a centralized inspection VPC',
    ],
    a: 1,
    exp: 'AWS VPN CloudHub uses a single Virtual Private Gateway with multiple Site-to-Site VPN connections, one per customer gateway (branch office). Each branch can communicate with AWS resources via the VGW, and branches can also communicate with each other through the VGW hub. CloudHub relies entirely on VGW and Site-to-Site VPN; it does not require Transit Gateway.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company needs an EC2 instance to have multiple private IP addresses from different subnets for hosting multiple TLS certificates on different IPs. Which network feature enables this?',
    opts: [
      'Assign multiple Elastic IPs to the primary ENI',
      'Create multiple secondary ENIs from the desired subnets and attach them to the instance',
      'Configure IP aliasing at the OS level using a single ENI with multiple IP addresses from different subnets',
      'Use a Network Load Balancer with multiple target groups to present different IPs',
    ],
    a: 1,
    exp: 'Each ENI belongs to exactly one subnet and can hold multiple private IPs from that subnet\'s CIDR. To have IPs from different subnets, multiple ENIs must be created (one per subnet) and attached to the EC2 instance. The OS then sees multiple network interfaces, each with its own MAC and IP. IP aliasing cannot span subnets because a single ENI is constrained to one subnet.',
  },
  {
    domain: 'Network Implementation',
    q: 'A network team must configure BGP on a Direct Connect private VIF. They need to ensure AWS-side routes are preferred over VPN backup routes when Direct Connect is up. Which BGP attribute should they set on the VPN side?',
    opts: [
      'Set a lower LOCAL_PREF on the Direct Connect VIF advertisements',
      'Use AS-PATH prepending on the VPN tunnel BGP advertisements to make the VPN path appear longer',
      'Set the MED (Multi-Exit Discriminator) to 0 on the Direct Connect BGP session',
      'Configure the VPN with a higher BGP weight than the Direct Connect session',
    ],
    a: 1,
    exp: 'AS-PATH prepending on the VPN BGP session causes AWS to see a longer AS path for routes learned via VPN compared to Direct Connect. Since BGP prefers shorter AS paths (all else being equal), AWS will prefer Direct Connect-learned routes. When Direct Connect fails, the VPN routes (with prepended paths) become the only available paths and are used automatically.',
  },
  {
    domain: 'Network Implementation',
    q: 'A customer gateway device supports IKEv2 and ECMP. The company wants to use two Site-to-Site VPN tunnels simultaneously for active-active load balancing. Which VPN configuration is required?',
    opts: [
      'Enable accelerated VPN and configure two separate VPN connections to the same VGW',
      'Attach the VPN connection to a Transit Gateway with ECMP enabled and configure BGP on both tunnels',
      'Configure static routes on both tunnels and enable BGP for ECMP route selection',
      'Use a virtual private gateway with route propagation and enable ECMP in the VPC route table',
    ],
    a: 1,
    exp: 'Transit Gateway supports ECMP across multiple VPN tunnels when BGP is used. When equal-cost BGP routes are received over both tunnels, TGW distributes traffic across them using ECMP. Virtual Private Gateways (VGW) do not support ECMP; they use active-passive behavior. BGP must be configured on both tunnels to enable equal-cost route advertisement.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company is configuring an AWS Direct Connect hosted connection through a partner. The partner delivers a hosted VIF. What is the customer\'s first step to use this hosted VIF?',
    opts: [
      'Contact AWS support to activate the hosted connection on the customer\'s AWS account',
      'Accept the hosted VIF in the AWS console or CLI in the customer\'s AWS account',
      'Configure BGP on the on-premises router before the hosted VIF can be seen in the AWS account',
      'Create a Direct Connect Gateway and associate it before accepting the hosted VIF',
    ],
    a: 1,
    exp: 'When a Direct Connect partner provisions a hosted VIF and delivers it to a customer\'s AWS account, the customer must explicitly accept the hosted VIF in their AWS account (via the console or CLI) before it becomes active. Only after acceptance can the customer configure it with a virtual interface connection to a VGW, TGW, or DXGW and establish the BGP session.',
  },
  {
    domain: 'Network Implementation',
    q: 'An organization uses AWS Managed Prefix Lists to manage CIDR blocks for corporate office IPs referenced in multiple security groups. A new office is added. What is the correct operational procedure?',
    opts: [
      'Update each security group individually with the new office CIDR',
      'Add the new CIDR to the Managed Prefix List; all security groups referencing the list are automatically updated',
      'Create a new security group for the new office and add it as a source to existing security groups',
      'Use AWS Config to automatically detect and add the new office CIDR to security groups',
    ],
    a: 1,
    exp: 'AWS Managed Prefix Lists allow you to maintain a single list of CIDR blocks. When security groups (or route tables) reference a prefix list, any updates to the list are automatically reflected without modifying each individual security group. This is the key operational benefit: centralized management of IP sets that may be referenced across many resources.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company is deploying a Transit Gateway Connect attachment to integrate their SD-WAN appliance running inside a VPC. What transport mechanism does TGW Connect use, and what routing protocol is required?',
    opts: [
      'IPsec tunnels for transport with OSPF as the routing protocol',
      'GRE tunnels for transport with BGP as the routing protocol',
      'VXLAN encapsulation with static routes configured on the TGW',
      'MPLS labels over a Transit VIF with BGP for route advertisement',
    ],
    a: 1,
    exp: 'Transit Gateway Connect uses Generic Routing Encapsulation (GRE) tunnels over an underlying VPC or Direct Connect attachment as the transport layer. BGP is mandatory for route exchange between the SD-WAN appliance and the Transit Gateway over the Connect attachment. Static routing is not supported on TGW Connect attachments.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company needs to configure a customer gateway for a Site-to-Site VPN. The on-premises device is behind a NAT device. Which parameter must be set to support NAT-T (NAT Traversal)?',
    opts: [
      'Set the customer gateway IP to the private IP behind the NAT device',
      'Set the customer gateway IP to the NAT device\'s public IP and ensure UDP port 4500 is open through the NAT',
      'Enable IKEv1 aggressive mode to bypass NAT traversal requirements',
      'Configure a static route for the NAT device\'s IP in the VPN connection',
    ],
    a: 1,
    exp: 'When the customer gateway is behind NAT, the customer gateway object in AWS must be created with the NAT device\'s public IP address. NAT Traversal (NAT-T) encapsulates IPsec ESP traffic in UDP port 4500 to pass through NAT. Both IKE (UDP 500) and NAT-T (UDP 4500) must be permitted through the NAT device and any firewalls.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company uses Direct Connect with BFD (Bidirectional Forwarding Detection). What does BFD provide in this context?',
    opts: [
      'BFD encrypts BGP control plane traffic on the Direct Connect VIF',
      'BFD provides rapid failure detection for the Direct Connect link, enabling faster BGP failover than BGP keepalives alone',
      'BFD authenticates BGP peer sessions using MD5 hashing on the Direct Connect VIF',
      'BFD load-balances traffic across multiple Direct Connect VIFs using a round-robin algorithm',
    ],
    a: 1,
    exp: 'BFD is a sub-second failure detection protocol that runs alongside BGP on Direct Connect VIFs. It detects link or path failures much faster than BGP keepalive/hold timers (which can take 90 seconds or more by default). When BFD detects a failure, it immediately signals BGP to withdraw routes and trigger failover to a backup path such as a VPN or second Direct Connect connection.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company assigns secondary private IP addresses to an EC2 instance running a web application. Which action must the operating system administrator take after assigning secondary IPs in the AWS console?',
    opts: [
      'Reboot the instance to trigger cloud-init to pick up the new IP assignment',
      'Manually configure the secondary IP addresses on the OS network interface using ip addr add or equivalent commands',
      'Update the VPC route table to include the secondary IP with the instance as the target',
      'Attach a new ENI for each secondary IP and configure it in the OS',
    ],
    a: 1,
    exp: 'AWS assigns the secondary private IP to the ENI in the control plane, but most operating systems require manual configuration to bring the IP address up on the network interface. Administrators must use OS-level commands (e.g., ip addr add on Linux) or configure a network interface configuration file. Some AWS-provided AMIs and cloud-init configurations can automate this, but it is not automatic by default.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company has an existing 1 Gbps hosted Direct Connect connection and needs more bandwidth without procuring a new physical connection. Which option allows them to increase bandwidth within the partner\'s infrastructure?',
    opts: [
      'Upgrade the existing dedicated connection to 10 Gbps by contacting AWS support',
      'Request the partner to provision a new hosted connection at the desired higher bandwidth and create a new VIF',
      'Add the existing hosted connection to a LAG to aggregate bandwidth',
      'Enable Jumbo Frames on the hosted connection to improve effective throughput',
    ],
    a: 1,
    exp: 'Hosted Direct Connect connections are provisioned by AWS Direct Connect partners, and their bandwidth is controlled by the partner\'s infrastructure. To increase bandwidth, the customer requests a new hosted connection at a higher bandwidth tier from the partner (e.g., moving from 1 Gbps to 5 Gbps or 10 Gbps). Hosted connections cannot be added to LAGs; only dedicated connections support LAG. Jumbo frames affect MTU, not link capacity.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company is using a Transit Gateway with multiple VPC attachments. They notice that VPC route tables are not automatically receiving TGW routes. What must be enabled?',
    opts: [
      'Enable route propagation on the Transit Gateway attachment from each VPC',
      'Enable route propagation on the VPC route table for the Transit Gateway',
      'Configure a static route in the Transit Gateway route table for each VPC CIDR',
      'Enable BGP on the Transit Gateway to propagate routes to VPC route tables',
    ],
    a: 1,
    exp: 'VPC route tables have a "route propagation" feature that, when enabled for a Transit Gateway, automatically adds routes from the Transit Gateway\'s associated route table to the VPC route table. Without enabling propagation, you must manually add static routes. This is configured on the VPC route table (not the TGW attachment), by enabling "propagate routes" for the TGW as a route propagation source.',
  },
  {
    domain: 'Network Implementation',
    q: 'A company has a Direct Connect connection and a Site-to-Site VPN to the same VGW. Both advertise the same prefix. How does the VGW select which path to use for traffic from AWS to on-premises?',
    opts: [
      'VGW always prefers the VPN over Direct Connect for security reasons',
      'VGW prefers Direct Connect private VIF over VPN; within Direct Connect, longest prefix match and then AS-PATH length apply',
      'VGW uses ECMP across Direct Connect and VPN when the same prefix is advertised on both',
      'VGW selects based on the BGP MED value only; lower MED is preferred',
    ],
    a: 1,
    exp: 'AWS VGW path selection follows a specific order: (1) longest prefix match, (2) static routes over BGP, (3) Direct Connect private VIF over VPN, (4) shorter AS-PATH. Therefore, when Direct Connect and VPN advertise the same prefix, the VGW prefers the Direct Connect path. This is why Direct Connect is used as primary and VPN as backup when both terminate at the same VGW.',
  },

  // ─── Network Management & Operations (~14 questions) ─────────────────────

  {
    domain: 'Network Management & Operations',
    q: 'A security team wants to analyze VPC Flow Logs to detect port scanning activity. Which service enables them to run SQL queries against flow log data stored in S3?',
    opts: [
      'Amazon CloudWatch Logs Insights with a VPC Flow Log log group',
      'Amazon Athena with a table schema mapped to the VPC Flow Log fields in S3',
      'AWS Glue ETL job that transforms flow logs into a format queryable by Redshift',
      'Amazon OpenSearch Service with a Flow Log index template',
    ],
    a: 1,
    exp: 'Amazon Athena is a serverless SQL query service that works directly against data in S3. By creating an Athena table that matches the VPC Flow Log format (using partition projection for efficiency), analysts can run SQL queries to detect anomalies like port scanning (e.g., high connection attempt counts from a single source IP across many destination ports). CloudWatch Logs Insights also works but requires logs to be in CloudWatch, not S3.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company has on-premises DNS servers (10.0.0.2) and wants EC2 instances in their VPC to resolve on-premises DNS names while still resolving AWS-native DNS names like private hosted zones. Which Route 53 Resolver configuration achieves this?',
    opts: [
      'Update the VPC DHCP options to point to the on-premises DNS server for all DNS queries',
      'Create Route 53 Resolver outbound endpoints and a forwarding rule that forwards the on-premises domain (e.g., corp.example.com) to 10.0.0.2',
      'Create Route 53 Resolver inbound endpoints and configure the on-premises DNS server to forward all queries to the inbound endpoint IP',
      'Configure a Route 53 private hosted zone with a delegated subdomain pointing to the on-premises NS records',
    ],
    a: 1,
    exp: 'Route 53 Resolver outbound endpoints allow VPC instances to send specific DNS queries to on-premises DNS servers via forwarding rules. EC2 instances continue to use the VPC default resolver (169.254.169.253) for AWS-native resolution, and the outbound endpoint conditionally forwards queries matching the on-premises domain to the specified on-premises DNS IP. Changing DHCP options to point entirely to on-premises DNS would break AWS-native resolution.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company wants to continuously monitor the network path between two EC2 instances in different VPCs connected via Transit Gateway to verify reachability and identify configuration issues. Which AWS tool is best suited?',
    opts: [
      'VPC Flow Logs with anomaly detection rules in CloudWatch',
      'AWS Reachability Analyzer, which performs configuration analysis of the network path between source and destination',
      'AWS Network Access Analyzer, which finds paths from the internet to internal resources',
      'AWS CloudTrail logs filtered for network API calls on both VPCs',
    ],
    a: 1,
    exp: 'AWS Reachability Analyzer is a configuration analysis tool that evaluates the logical path between a source and destination using the network configuration (route tables, security groups, NACLs, gateways) without sending actual traffic. It identifies the hop-by-hop path or reports the specific configuration blocking reachability. It is ideal for troubleshooting TGW-connected VPC paths.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'An operations team notices increased packet loss on a Direct Connect connection. They want to verify actual traffic flows rather than configuration analysis. Which tool captures actual packet data from EC2 instance ENIs?',
    opts: [
      'VPC Flow Logs — they capture full packet payloads for analysis',
      'AWS Traffic Mirroring — it copies ENI traffic to a target for deep packet inspection',
      'AWS Reachability Analyzer — it replays recent traffic to detect packet loss',
      'CloudWatch Network Monitor — it captures and retransmits dropped packets',
    ],
    a: 1,
    exp: 'AWS Traffic Mirroring copies network traffic from an ENI to a target (another ENI, NLB, or Gateway Load Balancer) where tools like Wireshark or an IDS can perform deep packet inspection. VPC Flow Logs capture metadata (source/destination IP, port, protocol, bytes, packets) but not packet payloads. Traffic Mirroring is the only AWS-native mechanism that provides access to actual packet content.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A network engineer needs to investigate why DNS resolution for an internal hostname is failing inside a VPC. The private hosted zone exists and appears correctly configured. What is the first troubleshooting step?',
    opts: [
      'Delete and recreate the private hosted zone to reset DNS propagation',
      'Verify that "Enable DNS hostnames" and "Enable DNS support" are both enabled in the VPC settings',
      'Increase the TTL on the A record to force DNS cache refresh across all resolvers',
      'Check that the DHCP options set has the on-premises DNS server IP configured',
    ],
    a: 1,
    exp: 'For Route 53 private hosted zones to function within a VPC, both "Enable DNS resolution" (DNS support) and "Enable DNS hostnames" must be enabled in the VPC settings. If DNS support is disabled, the VPC resolver (AmazonProvidedDNS) is not accessible from within the VPC, and private hosted zone records cannot be resolved. This is one of the most common misconfigurations causing DNS failures in new VPCs.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company uses CloudWatch to monitor their VPC\'s NAT gateway. They want to receive an alert when the NAT gateway is processing connections at 90% of its per-AZ capacity limit. Which metric should they monitor?',
    opts: [
      'NatGatewayPacketsDropped — triggers when packet loss exceeds the capacity threshold',
      'NatGatewayConnectionAttemptCount — alerts when connection attempts per second approach the limit',
      'There is no built-in NAT gateway capacity metric; use VPC Flow Logs to calculate utilization',
      'NatGatewayActiveConnectionCount — compare against the documented connection limit per NAT gateway',
    ],
    a: 3,
    exp: 'NAT gateways publish NatGatewayActiveConnectionCount, NatGatewayBytesInFromSource, NatGatewayBytesInFromDestination, and related metrics to CloudWatch. By monitoring NatGatewayActiveConnectionCount against the documented limit of 55,000 simultaneous connections and creating a CloudWatch alarm at 90% of that limit, operations teams can detect capacity pressure. NatGatewayPacketsDropped indicates actual drops, which occur after the limit is already exceeded.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company uses AWS Network Manager to manage their global network. They have Transit Gateways in three Regions registered with Network Manager. Which capability does Network Manager provide that Transit Gateway alone does not?',
    opts: [
      'Network Manager enables Transit Gateway route table configuration across Regions from a single console',
      'Network Manager provides a global network topology view, route analysis, and event monitoring across all registered Transit Gateways and connections',
      'Network Manager automates BGP peering between Transit Gateways in different Regions',
      'Network Manager enforces security group rules across all VPCs attached to registered Transit Gateways',
    ],
    a: 1,
    exp: 'AWS Network Manager provides a centralized, global view of your network across multiple Regions. It displays a topology map of Transit Gateways, VPC attachments, Direct Connect connections, VPN connections, and SD-WAN devices. It also provides route analysis, event monitoring, and integration with third-party SD-WAN vendors. It is an observability and management layer; it does not configure routing or enforce security policies.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A team wants to identify all AWS resources in their account that have unintended access paths from the internet to their private EC2 instances. Which tool performs this analysis?',
    opts: [
      'AWS Reachability Analyzer with source set to the internet gateway and destination set to each instance',
      'AWS Network Access Analyzer, configured to find paths from internet gateways to network interfaces',
      'AWS Config rule "restricted-ssh" applied to all security groups in the account',
      'AWS Trusted Advisor security check for unrestricted port access',
    ],
    a: 1,
    exp: 'AWS Network Access Analyzer identifies unintended network access to AWS resources. It uses a scope definition (e.g., paths originating from internet gateways) to find all network paths that reach specified resources like EC2 ENIs. Unlike Reachability Analyzer which tests a specific source-destination pair, Network Access Analyzer sweeps the entire account to discover potentially unexpected access paths, making it ideal for continuous compliance monitoring.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company wants to configure ECMP (Equal Cost Multi-Path) routing over two Direct Connect connections to the same Transit Gateway. What must be true for ECMP to work?',
    opts: [
      'Both connections must be in the same Direct Connect location and use the same VLAN',
      'Both connections must advertise the same prefixes with the same BGP attributes (same AS-PATH length, same MED) and ECMP must be enabled on the Transit Gateway',
      'ECMP is automatically enabled on Transit Gateway for all BGP routes; no configuration is needed',
      'Both connections must be bundled in a LAG before Transit Gateway can perform ECMP across them',
    ],
    a: 1,
    exp: 'Transit Gateway supports ECMP for Direct Connect transit VIF attachments when multiple paths advertise the same prefix with equal BGP attributes. For ECMP to be effective, routes must have the same AS-PATH length, same MED, and same LOCAL_PREF. ECMP support must be enabled when configuring the TGW (it is not on by default for all attachment types). LAG bundles physical links into one logical link and is different from ECMP across separate logical connections.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company stores VPC Flow Logs in CloudWatch Logs. They want to detect when any EC2 instance is communicating on port 22 from an IP outside the corporate range (203.0.113.0/24). Which approach is most operationally efficient?',
    opts: [
      'Write a Lambda function that scans all flow log records nightly and flags port 22 connections',
      'Create a CloudWatch Logs metric filter that counts ACCEPT records with destination port 22 from non-corporate IPs, then create an alarm on the metric',
      'Export flow logs to S3 and schedule an Athena query daily to detect port 22 connections',
      'Enable AWS Config and write a custom rule that evaluates security groups for port 22 rules',
    ],
    a: 1,
    exp: 'CloudWatch Logs metric filters process incoming log events in real time, incrementing a custom metric when a log event matches the filter pattern. An alarm on this metric can trigger near-real-time notifications (SNS, Lambda) when unauthorized SSH connections are detected. This is more operationally efficient than nightly Lambda scans or daily Athena queries because it provides immediate alerting.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A Route 53 Resolver inbound endpoint has two IP addresses in two Availability Zones. On-premises DNS servers forward queries to these IPs. Why are two IPs in different AZs recommended?',
    opts: [
      'Route 53 requires at least two IPs for MX record resolution to function correctly',
      'Two IPs in different AZs provide high availability; if one AZ becomes unavailable, the other endpoint IP continues serving DNS queries',
      'Two IPs enable DNS round-robin load balancing to distribute query load from on-premises resolvers',
      'AWS billing charges per endpoint IP, so two IPs double the forwarding capacity for free tier eligibility',
    ],
    a: 1,
    exp: 'Deploying Route 53 Resolver inbound endpoint ENIs in multiple Availability Zones ensures DNS resolution continues if one AZ experiences an outage. On-premises DNS servers should be configured to try both endpoint IPs so that if one is unreachable, they automatically fail over to the other. This is a standard high-availability design for any service that requires resilience against single-AZ failures.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company uses VPC Flow Logs and wants to identify rejected traffic to understand security group and NACL denies. Which flow log field indicates whether traffic was accepted or rejected?',
    opts: [
      'The "action" field, which contains either ACCEPT or REJECT',
      'The "log-status" field, which contains either OK or NODATA',
      'The "flow-direction" field, which contains either ingress or egress',
      'The "traffic-type" field, which contains either ALLOW or DENY',
    ],
    a: 0,
    exp: 'The "action" field in VPC Flow Log records indicates whether the traffic was ACCEPT (allowed by security group and NACL) or REJECT (denied by security group or NACL). Filtering flow log records where action = "REJECT" reveals blocked connection attempts. The "log-status" field indicates whether logging was successful (OK), had no data (NODATA), or was skipped (SKIPDATA).',
  },
  {
    domain: 'Network Management & Operations',
    q: 'A company configures Route 53 Resolver DNS Firewall. They want to block queries to known malware command-and-control domains while allowing all other traffic. Which rule action and order should be used?',
    opts: [
      'Create an ALLOW rule for all domains and place it first, then create a BLOCK rule for malware domains',
      'Create a BLOCK rule for malware domains using an AWS-managed domain list and set a lower priority number (evaluated first); allow all other traffic by default',
      'Create a DENY rule for malware domains and an ALERT rule for all other domains in the same rule group',
      'Create an ALLOW rule for known-good domains and a BLOCK OVERRIDE rule for malware domains with equal priority',
    ],
    a: 1,
    exp: 'Route 53 Resolver DNS Firewall evaluates rules in priority order (lowest number first). By creating a BLOCK rule with a low priority number targeting an AWS-managed malware domain list, queries matching the list are blocked before any other rules are evaluated. Traffic not matching any rule is allowed by default (unless the rule group is set to block unmatched queries). Rule priority ordering is critical for correct DNS Firewall behavior.',
  },
  {
    domain: 'Network Management & Operations',
    q: 'An operations team wants to verify that a newly created security group rule change did not unintentionally open a network path from the internet to a database instance. Which service provides this analysis without sending real traffic?',
    opts: [
      'AWS CloudTrail — review the security group modification event to validate the rule change',
      'AWS Reachability Analyzer — analyze the path from an internet gateway to the database instance ENI',
      'AWS Trusted Advisor — run the security recommendations check for open ports',
      'Amazon Inspector — scan the database instance for open network vulnerabilities',
    ],
    a: 1,
    exp: 'AWS Reachability Analyzer performs static configuration analysis of the network path between two endpoints without sending actual traffic. After a security group change, running Reachability Analyzer from the internet gateway to the database ENI quickly confirms whether a reachable path now exists. This is faster and safer than probing with real traffic and provides a detailed explanation of each hop in the path.',
  },

  // ─── Network Security Compliance & Governance (~17 questions) ────────────

  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company deploys AWS Network Firewall in a centralized inspection VPC. They need to block outbound HTTP requests to a category of known-malicious domains using deep packet inspection. Which Network Firewall rule type should they use?',
    opts: [
      'Stateless rules with a 5-tuple match on destination port 80',
      'Stateful domain list rules in STRICT order mode that reference a deny domain list',
      'Suricata-compatible stateful rules using the "drop http" action with a content match',
      'Managed threat intelligence rules using AWS-provided IP reputation lists',
    ],
    a: 1,
    exp: 'AWS Network Firewall supports domain list rules that allow or block HTTP/HTTPS traffic based on domain names extracted via SNI (for HTTPS) or Host header (for HTTP). Domain list rules operate as stateful rules and support ALLOW or DENY actions against a list of fully qualified domain names or wildcard patterns. Suricata rules can also perform content matching but require writing individual signature patterns rather than maintaining a domain list.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'An AWS WAF rule must block HTTP requests where the User-Agent header matches a specific pattern used by a known bot. Which WAF rule component is used?',
    opts: [
      'IP set match statement targeting the bot\'s known IP addresses',
      'Regex pattern set match statement on the User-Agent header',
      'Size constraint statement limiting User-Agent header to fewer than 50 characters',
      'Geographic match statement blocking requests from countries associated with the bot operator',
    ],
    a: 1,
    exp: 'AWS WAF regex pattern sets allow matching request components (headers, URI, body, query string) against one or more regular expressions. By creating a regex pattern set containing the bot User-Agent pattern and referencing it in a Regex Pattern Set Match statement applied to the User-Agent header, you can precisely identify and block those requests. IP set matching only works when the bot\'s source IPs are known and stable.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'AWS Shield Advanced is enabled for an organization. During a large-scale DDoS attack, the team wants human assistance from AWS. How do they engage the AWS DDoS Response Team (DRT)?',
    opts: [
      'Open a standard AWS support case and select "DDoS Attack" as the issue category',
      'Contact the DRT via the AWS Shield console or through an existing proactive engagement setup with Shield Advanced',
      'Enable AWS WAF Bot Control to automatically signal the DRT when attack thresholds are crossed',
      'Use AWS Firewall Manager to trigger automatic DRT escalation via an SNS notification',
    ],
    a: 1,
    exp: 'Shield Advanced customers can contact the AWS DDoS Response Team (DRT) through the AWS Shield console during an active event. Proactive engagement can also be configured so AWS automatically contacts the customer during significant DDoS events against protected resources. The DRT has access to AWS infrastructure telemetry and can assist with attack analysis, WAF rule creation, and escalation. Standard support cases are separate from DRT engagement.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company uses AWS Firewall Manager to deploy WAF policies across all accounts in their AWS Organization. A new account is added to the organization. What happens to the WAF policy in the new account?',
    opts: [
      'The administrator must manually apply the Firewall Manager policy to the new account',
      'Firewall Manager automatically applies the WAF policy to the new account if it falls within the policy scope',
      'The new account receives WAF rules only after it is added to the policy\'s include list in the Firewall Manager console',
      'Firewall Manager sends an SNS notification to the new account owner to opt in to the WAF policy',
    ],
    a: 1,
    exp: 'One of the key benefits of AWS Firewall Manager is automatic enforcement of security policies across AWS Organizations. When a new account is added to the organization and falls within the policy scope (e.g., all accounts, or accounts with specific tags/OUs), Firewall Manager automatically applies the policy and creates the required WAF web ACL and rules. No manual action is required for accounts that fall within scope.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company needs to deploy AWS Network Firewall for both inbound and outbound inspection of traffic for VPCs in a distributed deployment model. In this model, where is the Network Firewall deployed?',
    opts: [
      'A single centralized inspection VPC; all traffic is routed through Transit Gateway to this VPC',
      'Each individual VPC has its own Network Firewall deployed in dedicated firewall subnets',
      'Network Firewall is deployed at the AWS Region level and automatically inspects all VPC traffic',
      'Network Firewall is deployed in the Direct Connect Gateway to inspect hybrid traffic',
    ],
    a: 1,
    exp: 'In the distributed deployment model, AWS Network Firewall is deployed directly in each VPC that requires inspection, in dedicated firewall subnets (one per AZ). The VPC route tables direct traffic through the firewall endpoints before reaching the internet gateway or other destinations. This model provides per-VPC inspection without requiring centralized routing through a shared inspection VPC, reducing TGW data processing costs.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A regulated company must implement TLS inspection for outbound HTTPS traffic from EC2 instances. Which AWS service and feature combination enables this?',
    opts: [
      'AWS WAF with SSL certificate validation rules applied to an ALB',
      'AWS Network Firewall with TLS inspection configuration using a CA certificate stored in AWS Certificate Manager',
      'AWS Shield Advanced with deep packet inspection mode enabled for HTTPS traffic',
      'AWS PrivateLink with TLS termination at the VPC endpoint level',
    ],
    a: 1,
    exp: 'AWS Network Firewall supports TLS inspection by acting as a man-in-the-middle proxy for outbound HTTPS traffic. A TLS inspection configuration is created using a CA certificate from AWS Certificate Manager Private CA. The firewall decrypts TLS traffic, inspects the plaintext content using stateful rules, and re-encrypts before forwarding. This enables full visibility into encrypted outbound traffic for data loss prevention and malware detection.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company is designing network segmentation for PCI DSS compliance. Cardholder data must be isolated from all other workloads. Which approach provides the strongest network-layer isolation?',
    opts: [
      'Place cardholder data systems in a dedicated security group with rules allowing only required ports from specific source security groups',
      'Deploy cardholder data systems in dedicated subnets within a dedicated VPC with NACLs denying all non-approved traffic, and use PrivateLink to expose required interfaces to other systems',
      'Tag all cardholder data EC2 instances and use AWS Config to enforce security group rules via automated remediation',
      'Enable VPC Flow Logs on the cardholder data subnet and alert on any unexpected traffic flows',
    ],
    a: 1,
    exp: 'PCI DSS requires clear network segmentation of the cardholder data environment (CDE). Placing CDE systems in a dedicated VPC with restrictive NACLs provides network-layer isolation enforced at the subnet boundary. Using PrivateLink to expose only specific, required services to non-CDE VPCs avoids full VPC peering, which would allow broader access. Security groups alone are instance-level controls and do not achieve the same level of network-layer segmentation.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'An AWS WAF rate-based rule is configured with a limit of 2,000 requests per 5-minute window per IP. A legitimate CDN service proxies millions of users through a small set of IPs. What problem arises and how should it be addressed?',
    opts: [
      'Rate limiting does not apply to CloudFront distributions; remove WAF from the CloudFront setup',
      'The CDN\'s egress IPs will hit the rate limit, blocking legitimate users; use the forwarded-IP configuration to rate-limit based on the X-Forwarded-For header\'s original client IP instead',
      'Increase the WAF rate limit to 1 million requests per 5 minutes to accommodate CDN traffic patterns',
      'Enable WAF Bot Control to whitelist the CDN\'s IP range as a known good bot automatically',
    ],
    a: 1,
    exp: 'AWS WAF rate-based rules support "forwarded IP" configuration, which uses the IP address in the X-Forwarded-For header (the original client IP as inserted by the CDN) rather than the source IP of the incoming request (the CDN egress IP). This correctly applies rate limiting per end-user IP, preventing CDN IPs from being blocked while still protecting against individual users exceeding the threshold.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company wants to use Shield Advanced cost protection. Under what condition does Shield Advanced provide credits for scaling costs incurred during a DDoS attack?',
    opts: [
      'Shield Advanced provides credits automatically for all scaling costs on any protected resource',
      'Credits are provided for scaling costs on Route 53, CloudFront, ELB, and EC2 resources that scaled due to a confirmed DDoS attack on a Shield Advanced-protected resource',
      'Credits are issued only when the customer manually reports scaling costs to AWS support within 24 hours of the attack',
      'Shield Advanced cost protection covers only the AWS Shield Advanced subscription fee during months with confirmed attacks',
    ],
    a: 1,
    exp: 'Shield Advanced cost protection provides credits for additional charges incurred on specific AWS services (Route 53, CloudFront, ELB, EC2 Elastic IPs, and AWS WAF) when those charges result directly from a DDoS attack on a Shield Advanced-protected resource. Customers must request the credit through a support case. The protection applies to costs from auto-scaling, data transfer, and Shield response, not the Shield subscription itself.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company needs to enforce that all new VPCs created across their AWS Organization do not have an internet gateway attached. Which service and mechanism achieves this?',
    opts: [
      'AWS Config rule "vpc-no-internet-gateway" with auto-remediation that removes unauthorized internet gateways',
      'AWS Organizations Service Control Policy (SCP) that denies ec2:AttachInternetGateway across all member accounts',
      'AWS Firewall Manager policy that detects and removes internet gateways from non-compliant VPCs',
      'AWS CloudFormation stack sets that deploy VPCs without internet gateways, preventing manual creation via IAM permissions',
    ],
    a: 1,
    exp: 'Service Control Policies (SCPs) in AWS Organizations are guardrails applied at the account or OU level that restrict which AWS API calls can be made, regardless of IAM permissions. An SCP denying ec2:AttachInternetGateway prevents any principal in any member account from attaching an internet gateway to any VPC. AWS Config detects violations after the fact; SCPs prevent the action from occurring.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'An architect is comparing NACLs and security groups for protecting a database subnet. Which statement correctly describes a key difference?',
    opts: [
      'Security groups are stateless and evaluate both inbound and outbound rules for every packet; NACLs are stateful and only evaluate rules once per connection',
      'NACLs are stateless and apply to all traffic entering or leaving a subnet, evaluating rules in order; security groups are stateful and apply at the ENI level, automatically allowing return traffic',
      'NACLs support both allow and deny rules but cannot reference other security groups; security groups support only allow rules but can reference other security groups',
      'Security groups support deny rules for specific IP ranges, while NACLs can only deny by protocol and port',
    ],
    a: 1,
    exp: 'NACLs are stateless, meaning they evaluate all traffic independently without tracking connection state — both inbound and outbound rules must explicitly allow return traffic. NACLs apply to all traffic traversing a subnet boundary. Security groups are stateful: return traffic for an established connection is automatically allowed regardless of outbound rules. Security groups apply at the ENI level and support allow rules only (no explicit deny), while NACLs support both allow and deny rules with numbered rule ordering.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company uses AWS WAF with Bot Control to protect a retail website during a product launch. They want to allow known legitimate search engine crawlers but block credential-stuffing bots. Which Bot Control managed rule group mode should be used?',
    opts: [
      'Common mode — blocks all bot traffic including search engine crawlers',
      'Targeted mode — provides enhanced protection against sophisticated bots while using verified bot signals to allow legitimate crawlers',
      'Basic mode — only inspects high-confidence bot signals and allows all crawlers by default',
      'Strict mode — requires CAPTCHA for all non-human traffic including search engine crawlers',
    ],
    a: 1,
    exp: 'AWS WAF Bot Control Targeted mode provides enhanced protection against targeted bots like credential stuffers and scrapers. It uses advanced detection signals and can verify the legitimacy of browser-based clients using browser fingerprinting. Verified legitimate crawlers (like Googlebot) are allowed by the managed rule group using IP verification. Common mode provides general bot detection with less sophistication against targeted attacks.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company\'s security team wants to ensure that PrivateLink endpoint services can only be accessed by specific AWS accounts. Which control mechanisms are available for PrivateLink?',
    opts: [
      'Attach a WAF web ACL to the NLB backing the endpoint service to filter traffic by source account',
      'Configure the endpoint service\'s allowed principals list with specific AWS account IDs or IAM principals, and require connection acceptance',
      'Use a VPC endpoint policy on the consumer endpoint to restrict which source accounts can invoke the service',
      'Apply an NLB security group with rules allowing only the consumer VPC CIDR ranges',
    ],
    a: 1,
    exp: 'PrivateLink endpoint services support an allowed principals list that restricts which AWS accounts, IAM users, or IAM roles can create interface endpoints to the service. Additionally, requiring connection acceptance means new endpoint connection requests must be manually approved by the service owner, providing a second layer of control. VPC endpoint policies apply on the consumer side and restrict what the endpoint can do, not who can connect to the provider.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company is using AWS Network Firewall with Suricata-compatible stateful rules. They want to detect and alert on (but not block) any outbound SSH connection from EC2 instances to destinations outside the VPC CIDR. Which Suricata rule action should they use?',
    opts: [
      'drop tcp any any -> !$HOME_NET 22 (msg:"Outbound SSH detected"; sid:1001;)',
      'alert tcp $HOME_NET any -> !$HOME_NET 22 (msg:"Outbound SSH detected"; sid:1001;)',
      'reject tcp $HOME_NET any -> !$HOME_NET 22 (msg:"Outbound SSH detected"; sid:1001;)',
      'pass tcp $HOME_NET any -> !$HOME_NET 22 (msg:"Outbound SSH detected"; sid:1001;)',
    ],
    a: 1,
    exp: 'In Suricata rule syntax used by AWS Network Firewall, the "alert" action generates an alert log entry without dropping the traffic, while "drop" blocks the packet, and "reject" blocks and sends a reset. The source $HOME_NET refers to the VPC CIDR, and !$HOME_NET means any destination outside the VPC. This rule alerts when instances (source) initiate SSH (port 22) to external destinations without blocking the traffic.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company wants to implement a WAF rule that applies geographic restrictions, blocking requests from countries not in their approved market list. Which WAF rule type implements this?',
    opts: [
      'IP set match statement with CIDR ranges assigned to blocked countries',
      'Geo match statement targeting the list of blocked countries',
      'Rate-based rule with a geographic aggregation key to limit requests per country',
      'Label match statement combined with a Bot Control rule that classifies traffic by country',
    ],
    a: 1,
    exp: 'AWS WAF provides a Geo Match statement that evaluates the country of origin of incoming requests based on IP geolocation databases. You can create rules that block (or allow) requests from specific countries with a simple configuration listing country codes. This is more maintainable than manually managing IP set CIDR ranges for every country\'s address space, which can run into thousands of CIDRs.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company needs AWS Firewall Manager to manage security groups across all accounts, ensuring no security group allows unrestricted inbound access on port 3389 (RDP). Which Firewall Manager policy type addresses this?',
    opts: [
      'AWS Network Firewall policy with a stateful rule blocking port 3389',
      'Security group policy with audit scope settings that flag and optionally remediate non-compliant security groups across the organization',
      'WAF policy with a custom rule blocking requests on port 3389',
      'Route 53 Resolver DNS Firewall policy preventing resolution of RDP-related domain names',
    ],
    a: 1,
    exp: 'AWS Firewall Manager security group policies allow administrators to audit security groups across all accounts in an AWS Organization. Audit policies detect security groups that have rules violating defined criteria (such as allowing 0.0.0.0/0 on port 3389) and can automatically remediate by removing the violating rule or sending findings to Security Hub. This provides centralized governance of security group configurations at organizational scale.',
  },
  {
    domain: 'Network Security Compliance & Governance',
    q: 'A company uses AWS Shield Advanced and wants to protect against volumetric UDP flood attacks targeting an Elastic IP on an EC2 instance. Which action in Shield Advanced helps mitigate this type of attack in real time?',
    opts: [
      'Enable CloudFront in front of the EC2 instance to absorb UDP flood traffic at the edge',
      'Use Shield Advanced automatic application layer DDoS mitigation with WAF ACL integration',
      'Configure Shield Advanced proactive engagement so the DRT can apply network-level ACLs to drop attack traffic upstream at the AWS network edge',
      'Enable Enhanced Network Adapter (ENA) on the EC2 instance to improve packet processing throughput during the attack',
    ],
    a: 2,
    exp: 'Shield Advanced includes the AWS DDoS Response Team (DRT) who can apply upstream mitigations at the AWS network edge, including BGP blackholing and custom network-level ACLs, to drop volumetric attack traffic before it reaches the customer\'s EC2 instance. This is more effective than instance-level mitigations for large-scale volumetric attacks. Automatic application layer mitigation applies to HTTP/HTTPS floods, not UDP floods.',
  },

  // ── Additional ANS-C01 practice questions (60 added) ──

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "For AWS Certified Advanced Networking – Specialty certification, Network Design knowledge is tested through scenarios like a manufacturing company modernizing IT. Which solution fits?",
    opts: [
      "Use default network design settings without hardening",
      "Centralize all network design decisions without stakeholder review",
      "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Deprecate network design controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A team at a media company with global users debates Network Implementation options while studying AWS Certified Advanced Networking – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Centralize all network implementation decisions without stakeholder review",
      "Deprecate network implementation controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network implementation policies",
      "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "Which Network Management & Operations capability is validated by AWS Certified Advanced Networking – Specialty for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives",
      "Deprecate network management & operations controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network management & operations policies",
      "Disable monitoring for network management & operations to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "When evaluating Network Security Compliance & Governance tools for AWS Certified Advanced Networking – Specialty, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Use an undocumented workaround that bypasses network security compliance & governance policies",
      "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Disable monitoring for network security compliance & governance to improve performance",
      "Grant excessive privileges that violate network security compliance & governance least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A healthcare organization must document Network Design procedures for AWS Certified Advanced Networking – Specialty compliance. Which standard applies?",
    opts: [
      "Disable monitoring for network design to improve performance",
      "Grant excessive privileges that violate network design least-privilege principles",
      "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Rely solely on manual processes with no network design automation",
    ],
    a: 2,
    exp: "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A AWS Certified Advanced Networking – Specialty instructor asks about Network Implementation in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Grant excessive privileges that violate network implementation least-privilege principles",
      "Rely solely on manual processes with no network implementation automation",
      "Ignore network implementation compliance requirements for faster deployment",
      "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "Which Network Management & Operations metric best indicates AWS Certified Advanced Networking – Specialty readiness for a government agency?",
    opts: [
      "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Rely solely on manual processes with no network management & operations automation",
      "Ignore network management & operations compliance requirements for faster deployment",
      "Mix production and test network management & operations configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A SaaS startup scaling rapidly is troubleshooting a Network Security Compliance & Governance issue while preparing for AWS Certified Advanced Networking – Specialty. What is the first step?",
    opts: [
      "Ignore network security compliance & governance compliance requirements for faster deployment",
      "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Mix production and test network security compliance & governance configurations in one environment",
      "Store sensitive network security compliance & governance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "In AWS Certified Advanced Networking – Specialty, how should a manufacturing company modernizing IT handle a trade-off involving Network Design?",
    opts: [
      "Mix production and test network design configurations in one environment",
      "Store sensitive network design credentials in plain text configuration files",
      "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Skip network design testing before production rollout",
    ],
    a: 2,
    exp: "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation pattern is commonly tested on AWS Certified Advanced Networking – Specialty for scenarios involving a media company with global users?",
    opts: [
      "Store sensitive network implementation credentials in plain text configuration files",
      "Skip network implementation testing before production rollout",
      "Implement network implementation without change management or rollback plans",
      "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "A multinational enterprise is preparing for AWS Certified Advanced Networking – Specialty and must strengthen Network Management & Operations. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives",
      "Skip network management & operations testing before production rollout",
      "Implement network management & operations without change management or rollback plans",
      "Use default network management & operations settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "During a AWS Certified Advanced Networking – Specialty readiness review at a regulated financial institution, which Network Security Compliance & Governance approach meets certification objectives?",
    opts: [
      "Implement network security compliance & governance without change management or rollback plans",
      "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Use default network security compliance & governance settings without hardening",
      "Centralize all network security compliance & governance decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A consultant advising a healthcare organization on AWS Certified Advanced Networking – Specialty recommends improvements to Network Design. What should they implement?",
    opts: [
      "Use default network design settings without hardening",
      "Centralize all network design decisions without stakeholder review",
      "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Deprecate network design controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Advanced Networking – Specialty standards?",
    opts: [
      "Centralize all network implementation decisions without stakeholder review",
      "Deprecate network implementation controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network implementation policies",
      "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "An audit of a government agency reveals gaps in Network Management & Operations for AWS Certified Advanced Networking – Specialty. Which remediation is CORRECT?",
    opts: [
      "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Deprecate network management & operations controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network management & operations policies",
      "Disable monitoring for network management & operations to improve performance",
    ],
    a: 0,
    exp: "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Advanced Networking – Specialty study plan focused on Network Security Compliance & Governance. Which resource topic is essential?",
    opts: [
      "Use an undocumented workaround that bypasses network security compliance & governance policies",
      "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Disable monitoring for network security compliance & governance to improve performance",
      "Grant excessive privileges that violate network security compliance & governance least-privilege principles",
    ],
    a: 1,
    exp: "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "When a manufacturing company modernizing IT implements AWS Certified Advanced Networking – Specialty controls for Network Design, which practice reduces operational risk?",
    opts: [
      "Disable monitoring for network design to improve performance",
      "Grant excessive privileges that violate network design least-privilege principles",
      "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Rely solely on manual processes with no network design automation",
    ],
    a: 2,
    exp: "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A AWS Certified Advanced Networking – Specialty practice exam scenario covers Network Implementation for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Grant excessive privileges that violate network implementation least-privilege principles",
      "Rely solely on manual processes with no network implementation automation",
      "Ignore network implementation compliance requirements for faster deployment",
      "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "Which Network Management & Operations principle is emphasized in AWS Certified Advanced Networking – Specialty when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives",
      "Rely solely on manual processes with no network management & operations automation",
      "Ignore network management & operations compliance requirements for faster deployment",
      "Mix production and test network management & operations configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A regulated financial institution failed a mock AWS Certified Advanced Networking – Specialty question on Network Security Compliance & Governance. What concept should they review?",
    opts: [
      "Ignore network security compliance & governance compliance requirements for faster deployment",
      "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Mix production and test network security compliance & governance configurations in one environment",
      "Store sensitive network security compliance & governance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "For AWS Certified Advanced Networking – Specialty certification, Network Design knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Mix production and test network design configurations in one environment",
      "Store sensitive network design credentials in plain text configuration files",
      "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Skip network design testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A team at a high-traffic e-commerce platform debates Network Implementation options while studying AWS Certified Advanced Networking – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Store sensitive network implementation credentials in plain text configuration files",
      "Skip network implementation testing before production rollout",
      "Implement network implementation without change management or rollback plans",
      "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "Which Network Management & Operations capability is validated by AWS Certified Advanced Networking – Specialty for organizations such as a government agency?",
    opts: [
      "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Skip network management & operations testing before production rollout",
      "Implement network management & operations without change management or rollback plans",
      "Use default network management & operations settings without hardening",
    ],
    a: 0,
    exp: "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "When evaluating Network Security Compliance & Governance tools for AWS Certified Advanced Networking – Specialty, a SaaS startup scaling rapidly should prioritize which criterion?",
    opts: [
      "Implement network security compliance & governance without change management or rollback plans",
      "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Use default network security compliance & governance settings without hardening",
      "Centralize all network security compliance & governance decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A manufacturing company modernizing IT must document Network Design procedures for AWS Certified Advanced Networking – Specialty compliance. Which standard applies?",
    opts: [
      "Use default network design settings without hardening",
      "Centralize all network design decisions without stakeholder review",
      "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Deprecate network design controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A AWS Certified Advanced Networking – Specialty instructor asks about Network Implementation in the context of a media company with global users. What is the accurate response?",
    opts: [
      "Centralize all network implementation decisions without stakeholder review",
      "Deprecate network implementation controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network implementation policies",
      "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "Which Network Management & Operations metric best indicates AWS Certified Advanced Networking – Specialty readiness for a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives",
      "Deprecate network management & operations controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network management & operations policies",
      "Disable monitoring for network management & operations to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A regulated financial institution is troubleshooting a Network Security Compliance & Governance issue while preparing for AWS Certified Advanced Networking – Specialty. What is the first step?",
    opts: [
      "Use an undocumented workaround that bypasses network security compliance & governance policies",
      "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Disable monitoring for network security compliance & governance to improve performance",
      "Grant excessive privileges that violate network security compliance & governance least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "In AWS Certified Advanced Networking – Specialty, how should a healthcare organization handle a trade-off involving Network Design?",
    opts: [
      "Disable monitoring for network design to improve performance",
      "Grant excessive privileges that violate network design least-privilege principles",
      "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Rely solely on manual processes with no network design automation",
    ],
    a: 2,
    exp: "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation pattern is commonly tested on AWS Certified Advanced Networking – Specialty for scenarios involving a high-traffic e-commerce platform?",
    opts: [
      "Grant excessive privileges that violate network implementation least-privilege principles",
      "Rely solely on manual processes with no network implementation automation",
      "Ignore network implementation compliance requirements for faster deployment",
      "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "A government agency is preparing for AWS Certified Advanced Networking – Specialty and must strengthen Network Management & Operations. Which option is BEST?",
    opts: [
      "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Rely solely on manual processes with no network management & operations automation",
      "Ignore network management & operations compliance requirements for faster deployment",
      "Mix production and test network management & operations configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "During a AWS Certified Advanced Networking – Specialty readiness review at a SaaS startup scaling rapidly, which Network Security Compliance & Governance approach meets certification objectives?",
    opts: [
      "Ignore network security compliance & governance compliance requirements for faster deployment",
      "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Mix production and test network security compliance & governance configurations in one environment",
      "Store sensitive network security compliance & governance credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A consultant advising a manufacturing company modernizing IT on AWS Certified Advanced Networking – Specialty recommends improvements to Network Design. What should they implement?",
    opts: [
      "Mix production and test network design configurations in one environment",
      "Store sensitive network design credentials in plain text configuration files",
      "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Skip network design testing before production rollout",
    ],
    a: 2,
    exp: "Select the network design option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation strategy is MOST appropriate when a media company with global users adopts AWS Certified Advanced Networking – Specialty standards?",
    opts: [
      "Store sensitive network implementation credentials in plain text configuration files",
      "Skip network implementation testing before production rollout",
      "Implement network implementation without change management or rollback plans",
      "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network implementation using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "An audit of a multinational enterprise reveals gaps in Network Management & Operations for AWS Certified Advanced Networking – Specialty. Which remediation is CORRECT?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives",
      "Skip network management & operations testing before production rollout",
      "Implement network management & operations without change management or rollback plans",
      "Use default network management & operations settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network management & operations approach recommended in official exam objectives. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A regulated financial institution is designing a AWS Certified Advanced Networking – Specialty study plan focused on Network Security Compliance & Governance. Which resource topic is essential?",
    opts: [
      "Implement network security compliance & governance without change management or rollback plans",
      "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Use default network security compliance & governance settings without hardening",
      "Centralize all network security compliance & governance decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for network security compliance & governance as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "When a healthcare organization implements AWS Certified Advanced Networking – Specialty controls for Network Design, which practice reduces operational risk?",
    opts: [
      "Use default network design settings without hardening",
      "Centralize all network design decisions without stakeholder review",
      "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Deprecate network design controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard network design solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A AWS Certified Advanced Networking – Specialty practice exam scenario covers Network Implementation for a high-traffic e-commerce platform. Which answer demonstrates mastery?",
    opts: [
      "Centralize all network implementation decisions without stakeholder review",
      "Deprecate network implementation controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network implementation policies",
      "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network implementation methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "Which Network Management & Operations principle is emphasized in AWS Certified Advanced Networking – Specialty when supporting a government agency?",
    opts: [
      "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Deprecate network management & operations controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network management & operations policies",
      "Disable monitoring for network management & operations to improve performance",
    ],
    a: 0,
    exp: "Adopt the network management & operations control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A SaaS startup scaling rapidly failed a mock AWS Certified Advanced Networking – Specialty question on Network Security Compliance & Governance. What concept should they review?",
    opts: [
      "Use an undocumented workaround that bypasses network security compliance & governance policies",
      "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Disable monitoring for network security compliance & governance to improve performance",
      "Grant excessive privileges that violate network security compliance & governance least-privilege principles",
    ],
    a: 1,
    exp: "Configure network security compliance & governance according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A team at a media company with global users debates Network Design options while studying AWS Certified Advanced Networking – Specialty. Which choice aligns with the exam guide?",
    opts: [
      "Grant excessive privileges that violate network design least-privilege principles",
      "Rely solely on manual processes with no network design automation",
      "Ignore network design compliance requirements for faster deployment",
      "Design network design using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network design using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation capability is validated by AWS Certified Advanced Networking – Specialty for organizations such as a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network implementation approach recommended in official exam objectives",
      "Rely solely on manual processes with no network implementation automation",
      "Ignore network implementation compliance requirements for faster deployment",
      "Mix production and test network implementation configurations in one environment",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network implementation approach recommended in official exam objectives. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "When evaluating Network Management & Operations tools for AWS Certified Advanced Networking – Specialty, a regulated financial institution should prioritize which criterion?",
    opts: [
      "Ignore network management & operations compliance requirements for faster deployment",
      "Follow industry best practices for network management & operations as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Mix production and test network management & operations configurations in one environment",
      "Store sensitive network management & operations credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Follow industry best practices for network management & operations as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A healthcare organization must document Network Security Compliance & Governance procedures for AWS Certified Advanced Networking – Specialty compliance. Which standard applies?",
    opts: [
      "Mix production and test network security compliance & governance configurations in one environment",
      "Store sensitive network security compliance & governance credentials in plain text configuration files",
      "Implement the standard network security compliance & governance solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Skip network security compliance & governance testing before production rollout",
    ],
    a: 2,
    exp: "Implement the standard network security compliance & governance solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A AWS Certified Advanced Networking – Specialty instructor asks about Network Design in the context of a high-traffic e-commerce platform. What is the accurate response?",
    opts: [
      "Store sensitive network design credentials in plain text configuration files",
      "Skip network design testing before production rollout",
      "Implement network design without change management or rollback plans",
      "Use the certified network design methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network design methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation metric best indicates AWS Certified Advanced Networking – Specialty readiness for a government agency?",
    opts: [
      "Adopt the network implementation control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Skip network implementation testing before production rollout",
      "Implement network implementation without change management or rollback plans",
      "Use default network implementation settings without hardening",
    ],
    a: 0,
    exp: "Adopt the network implementation control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "A SaaS startup scaling rapidly is troubleshooting a Network Management & Operations issue while preparing for AWS Certified Advanced Networking – Specialty. What is the first step?",
    opts: [
      "Implement network management & operations without change management or rollback plans",
      "Configure network management & operations according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Use default network management & operations settings without hardening",
      "Centralize all network management & operations decisions without stakeholder review",
    ],
    a: 1,
    exp: "Configure network management & operations according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "In AWS Certified Advanced Networking – Specialty, how should a manufacturing company modernizing IT handle a trade-off involving Network Security Compliance & Governance?",
    opts: [
      "Use default network security compliance & governance settings without hardening",
      "Centralize all network security compliance & governance decisions without stakeholder review",
      "Select the network security compliance & governance option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Deprecate network security compliance & governance controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Select the network security compliance & governance option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "Which Network Design pattern is commonly tested on AWS Certified Advanced Networking – Specialty for scenarios involving a media company with global users?",
    opts: [
      "Centralize all network design decisions without stakeholder review",
      "Deprecate network design controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network design policies",
      "Design network design using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network design using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "A multinational enterprise is preparing for AWS Certified Advanced Networking – Specialty and must strengthen Network Implementation. Which option is BEST?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network implementation approach recommended in official exam objectives",
      "Deprecate network implementation controls entirely to reduce complexity",
      "Use an undocumented workaround that bypasses network implementation policies",
      "Disable monitoring for network implementation to improve performance",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network implementation approach recommended in official exam objectives. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "During a AWS Certified Advanced Networking – Specialty readiness review at a regulated financial institution, which Network Management & Operations approach meets certification objectives?",
    opts: [
      "Use an undocumented workaround that bypasses network management & operations policies",
      "Follow industry best practices for network management & operations as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Disable monitoring for network management & operations to improve performance",
      "Grant excessive privileges that violate network management & operations least-privilege principles",
    ],
    a: 1,
    exp: "Follow industry best practices for network management & operations as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "A consultant advising a healthcare organization on AWS Certified Advanced Networking – Specialty recommends improvements to Network Security Compliance & Governance. What should they implement?",
    opts: [
      "Disable monitoring for network security compliance & governance to improve performance",
      "Grant excessive privileges that violate network security compliance & governance least-privilege principles",
      "Implement the standard network security compliance & governance solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Rely solely on manual processes with no network security compliance & governance automation",
    ],
    a: 2,
    exp: "Implement the standard network security compliance & governance solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "Which Network Design strategy is MOST appropriate when a high-traffic e-commerce platform adopts AWS Certified Advanced Networking – Specialty standards?",
    opts: [
      "Grant excessive privileges that violate network design least-privilege principles",
      "Rely solely on manual processes with no network design automation",
      "Ignore network design compliance requirements for faster deployment",
      "Use the certified network design methodology specified for AWS Certified Advanced Networking – Specialty candidates",
    ],
    a: 3,
    exp: "Use the certified network design methodology specified for AWS Certified Advanced Networking – Specialty candidates. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "An audit of a government agency reveals gaps in Network Implementation for AWS Certified Advanced Networking – Specialty. Which remediation is CORRECT?",
    opts: [
      "Adopt the network implementation control framework referenced in AWS Certified Advanced Networking – Specialty study materials",
      "Rely solely on manual processes with no network implementation automation",
      "Ignore network implementation compliance requirements for faster deployment",
      "Mix production and test network implementation configurations in one environment",
    ],
    a: 0,
    exp: "Adopt the network implementation control framework referenced in AWS Certified Advanced Networking – Specialty study materials. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "A SaaS startup scaling rapidly is designing a AWS Certified Advanced Networking – Specialty study plan focused on Network Management & Operations. Which resource topic is essential?",
    opts: [
      "Ignore network management & operations compliance requirements for faster deployment",
      "Configure network management & operations according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations",
      "Mix production and test network management & operations configurations in one environment",
      "Store sensitive network management & operations credentials in plain text configuration files",
    ],
    a: 1,
    exp: "Configure network management & operations according to AWS Certified Advanced Networking – Specialty exam blueprint recommendations. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "When a manufacturing company modernizing IT implements AWS Certified Advanced Networking – Specialty controls for Network Security Compliance & Governance, which practice reduces operational risk?",
    opts: [
      "Mix production and test network security compliance & governance configurations in one environment",
      "Store sensitive network security compliance & governance credentials in plain text configuration files",
      "Select the network security compliance & governance option that meets AWS Certified Advanced Networking – Specialty security and governance standards",
      "Skip network security compliance & governance testing before production rollout",
    ],
    a: 2,
    exp: "Select the network security compliance & governance option that meets AWS Certified Advanced Networking – Specialty security and governance standards. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Design ──
  {
    domain: "Network Design",
    q: "A AWS Certified Advanced Networking – Specialty practice exam scenario covers Network Design for a media company with global users. Which answer demonstrates mastery?",
    opts: [
      "Store sensitive network design credentials in plain text configuration files",
      "Skip network design testing before production rollout",
      "Implement network design without change management or rollback plans",
      "Design network design using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments",
    ],
    a: 3,
    exp: "Design network design using patterns validated in AWS Certified Advanced Networking – Specialty practice assessments. This is the recommended approach for the Network Design domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Implementation ──
  {
    domain: "Network Implementation",
    q: "Which Network Implementation principle is emphasized in AWS Certified Advanced Networking – Specialty when supporting a multinational enterprise?",
    opts: [
      "Apply the AWS Certified Advanced Networking – Specialty-aligned network implementation approach recommended in official exam objectives",
      "Skip network implementation testing before production rollout",
      "Implement network implementation without change management or rollback plans",
      "Use default network implementation settings without hardening",
    ],
    a: 0,
    exp: "Apply the AWS Certified Advanced Networking – Specialty-aligned network implementation approach recommended in official exam objectives. This is the recommended approach for the Network Implementation domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Management & Operations ──
  {
    domain: "Network Management & Operations",
    q: "A regulated financial institution failed a mock AWS Certified Advanced Networking – Specialty question on Network Management & Operations. What concept should they review?",
    opts: [
      "Implement network management & operations without change management or rollback plans",
      "Follow industry best practices for network management & operations as defined in the AWS Certified Advanced Networking – Specialty body of knowledge",
      "Use default network management & operations settings without hardening",
      "Centralize all network management & operations decisions without stakeholder review",
    ],
    a: 1,
    exp: "Follow industry best practices for network management & operations as defined in the AWS Certified Advanced Networking – Specialty body of knowledge. This is the recommended approach for the Network Management & Operations domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },

  // ── Network Security Compliance & Governance ──
  {
    domain: "Network Security Compliance & Governance",
    q: "For AWS Certified Advanced Networking – Specialty certification, Network Security Compliance & Governance knowledge is tested through scenarios like a healthcare organization. Which solution fits?",
    opts: [
      "Use default network security compliance & governance settings without hardening",
      "Centralize all network security compliance & governance decisions without stakeholder review",
      "Implement the standard network security compliance & governance solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements",
      "Deprecate network security compliance & governance controls entirely to reduce complexity",
    ],
    a: 2,
    exp: "Implement the standard network security compliance & governance solution that satisfies AWS Certified Advanced Networking – Specialty domain requirements. This is the recommended approach for the Network Security Compliance & Governance domain on the AWS Certified Advanced Networking – Specialty exam and reflects current certification objectives.",
  },
];
