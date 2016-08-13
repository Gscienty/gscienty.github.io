#[IR&IE] 一种信息检索模型_Boolean模型#
-------------------------------

在该模型下所有的词汇索引权值均为二值化的。对于一个查询q来说，是一个Boolean表达式。  
q_dnf是指q的析取范式  
q_cc是指q_dnf中的合取子项  
sim(d_j,q)是指文档d_j与q的相似程度，它将有两个值，其结果表达式为：  
![][1]

[1]: http://chart.googleapis.com/chart?cht=tx&chl=sim(d_j,q)=\{{1%20\exists%20q_{cc}%20\in%20q_{dnf}\cdot(\forall%20k_i,g_i(d_j)=g_i(q_{cc}))}%20\\%20{0%20otherwise}

于是，我们可以通过查询q来将范围缩小到一个交集中，而交集内的文档就是我们所要查询获得的结果。