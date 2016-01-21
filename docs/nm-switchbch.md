透明网桥
============
透明网桥是一种即插即用设备，只要把网桥接入局域网，不需要改动硬件和软件，无需设置地址开关，无需装入路由表或参数，网桥就能工作。

透明网桥以混杂方式工作，它接收与之连接的所有LAN传送的每一帧。当一帧到达时，网桥必须决定将其丢弃还是转发。在插入网桥之初，所有的散列表均为空。这时若网桥受到一个帧，会采用自学习（self-learning）算法处理收到的帧（这样就逐渐建立起转发表），并且按照转发表把帧转发出去。

1. 网桥收到一帧后先进行自学习。查找转发表中与收到帧的源地址有无相匹配的项目。如果没有，就在转发表中增加一个项目。如果有，则把原有的项目进行更新。
2. 转发帧。查找转发表中与收到帧的源地址有无相匹配的项目。如果没有，则通过所有其他接口进行转发。如果有，则按转发表中给出的接口进行转发。但应注意，若转发表中给出的接口就是该帧进入网桥的接口，则应丢弃这个帧。

三种交换技术
==========
1. 传统的第2层交换技术。仅包括数据链路层的转发。
2. 具有路由功能的第3层交换技术。最初是为了解决广播域的问题。3层交换机是为IP设计的，接口类型简单，拥有很强的3层包处理能力，价格又比相同速率的路由器低得多，非常适用于大规模局域网络。
3. 具有网络服务功能的第7层交换技术。通过逐层解开每一个数据包的每层封装，并识别出应用层的信息，以实现对内容的识别。

交换机级联、堆联技术比较
====================
级联技术可以实现多台交换机之间的互连。堆叠技术可以将多台交换机组成一个单元，从而提高更大的端口密度和更高的性能。

堆叠是指将一台以上的交换机组合起来共同工作，以便在有限的空间内提供尽可能多的端口。多台交换机经过堆叠形成一个堆叠单元。

级联相对容易，但堆叠这种技术有级联不可达到的优势。  
级联还有一个堆叠达不到的目的，是增加连接距离。  
首先，多台交换机堆叠在一起，从逻辑上来说，它们属于同一个设备。  
其次，多个设备级联会产生级联瓶颈。

VLAN技术
========
VLAN（虚拟局域网）是对连接到的第二层交换机端口的网络用户的逻辑分段，不受网络用户的物理位置限制而根据用户需求进行网络分段。

三层交换技术原理
================
二层交换技术+三层转发技术。  
三层交换技术的出现，解决了局域网中网段划分之后，网段中子网必须依赖路由器进行管理的局面，解决了传统路由器低速、复杂所造成的网络瓶颈问题。
If (N属于某直连网络)  
把IP报文直接转发  
else if（路由表包含目的为D的路由）  
根据路由表中的下一跳转发IP报文（如果存在多条匹配的路由，则选择子网掩码长度最长的路由转发）  
Else if（路由表中存在缺省路由）  
根据缺省路由转发IP报文  
Else  
向源主机 发送ICMP 出错消息，通知IP报文不能被转发。