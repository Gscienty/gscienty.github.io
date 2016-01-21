基本操作命令
======================

1. PING  Ping发送一个ICMP(Internet Control Messages Protocol）即因特网信报控制协议；回声请求消息给目的地并报告是否收到所希望的ICMP echo （ICMP回声应答）。它是用来检查网络是否通畅或者网络连接速度的命令。
2. IPCONFIG  一般用来检验人工配置的TCP/IP设置是否正确。  **ipconfig /all**   显示它已配置且所要使用的附加信息，并且显示内置于本地网卡中的物理地址（MAC）如果IP地址是从DHCP服务器租用的，IPConfig将显示DHCP服务器的IP地址和租用地址预计失效的日期  
**ipconfig /release**  
如果你输入ipconfig /release，那么所有接口的租用IP地址便重新交付给DHCP服务器（归还IP地址）  
如果你输入ipconfig /renew，那么本地计算机便设法与DHCP服务器取得联系，并租用一个IP地址。
3. TRACERT  
Tracert（跟踪路由）是路由跟踪实用程序，用于确定 IP数据包访问目标所采取的路径。该诊断实用程序将包含不同生存时间 (TTL) 值的 Internet 控制消息协议 (ICMP)回显数据包发送到目标，以决定到达目标采用的路由。
4. NETSTAT  
Netstat是在内核中访问网络及相关信息的程序，它能提供TCP连接，TCP和UDP监听，进程内存管理的相关报告。
