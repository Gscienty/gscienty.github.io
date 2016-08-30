#红黑树#
-------------------------
红黑树是一种二叉查找树，基于此拥有一个特别的特性，即每个节点都拥有红色或黑色两种颜色，通过颜色的约束能够使从根节点到叶子节点的路径所经过的节点相同，使红黑树大致是平衡的。如果红黑树的高度较低的话，对于红黑树的操作也相对会快一些，如果红黑树的高度比较大的话，对于红黑树的操作速度也优于链表。  
红黑树是一种平衡查找树，在红黑树出现变化时会进行平衡操作，所占的时间复杂度为O(lg n)

红黑树是一棵二叉树，并在节点的颜色上满足以下特性：  

+ 对于每一个节点，要么是红色的要么是黑色的
+ 根节点是黑色的
+ 如果节点是红色的，那么它的两个子节点就是黑色的
+ 对于每一个节点来说，从该节点起到其同层子孙节点的路径，经过的节点包含相同数量的黑色节点

当红黑树在进行插入、删除操作的时候，需要对红黑树的结构与节点的颜色进行微调，以使得红黑树能够保持其性质。我们将这种微调称作**旋转**。旋转包含两种基本方式：左旋和右旋。

左旋：基于x节点进行时，需要保证x的右子节点y不为空。y将代替x节点成为这棵子树的根节点，x将成为y的左子节点，原先的y的左子节点将成为x的右子节点。
右旋：基于x节点进行时，需要保证x的左子节点y不为空。y将代替x节点称为这棵子树的根节点，x将成为y的右子节点，原先的y的右子节点将成为x的左子节点。

伪代码描述：

    LEFT-ROTATE(T, x)  
      y = x.right         #set y
      x.right = y.left    #turn y's left subtree into x's right subtree
      if y.lift != T.nil
        y.left.p = x
      y.p = x.p           #link x's parent to y
      if x.p == T.nil
        T.root = y
      elseif x == x.p.left
        x.p.left = y
      else
        x.p.right == y
      y.left = x
      x.p = y

             x                    y
            / \                  / \
           a   y      =>        x   c
              / \              / \
             b   c            a   b


同样给出右旋的伪代码：

    RIGHT-ROTATE(T, x)
      y = x.left
      x.left = y.right
      if y.right != T.nil
        y.right.p = x
      y.p = x.p
      if x.p ==T.nil
        T.root = y
      elseif x == x.p.left
        x.p.left = y
      else
        x.p.right = y
      y.right = x
      x.p = y

           x                   y
          / \                 / \
         y   a        =>     b   x
        / \                     / \
       b   c                   c   a

##红黑树的插入
对于有n个节点的红黑树来说，插入一个元素的时间复杂度为 O(lg n)。 在进行红黑树的插入时，我们首先以有序二叉查找树插入节点的方式插入该节点，并将该节点赋予红色（疑问，为什么是红色而不是黑色？）。 为了保持红黑书的性质，我们将执行一个辅助过程，将红黑树重新着色并且对于一些节点将进行旋转过程。我们将这个过程称之为RB-INSERT-FIXUP(T, z)

以下是红黑树插入过程的伪代码描述：

    RB-INSERT(T, z)
      y = T.nil
      x = T.root
      while x != T.nil
        y = x
        if z.key < x.key
          x = x.left
        else
          x = x.right
      z.p = y
      if y == T.nil
        T.root = z
      elseif z.key < y.key
        y.left = z
      else
        y.right = z
      z.left = T.nil
      z.right = T.nil
      z.color = RED
      RB-INSERT-FIXUP(T, z)

以下是红黑树插入结束后的辅助过程伪代码描述：

    RB-INSERT-FIXUP(T, z)
      while z.p.color == RED
        if z.p == z.p.p.left
          y = z.p.p.right
          if y.color == RED       #case 1
            z.p.color = BLACK
            z.p.p.color = RED
            z = z.p.p
          else if z == z.p.right  #case 2
              z = z.p
              LEFT-ROTATE(T, z)
            z.p.color = BLACK     #case 3
            z.p.p.color = RED
            RIGHT-ROTATE(T, z.p.p)
        else
          y = z.p.p.right
          if y.color == RED
            z.p.color = BLACK     #case 1
            z.p.p.color = RED
            z = z.p.p
          else if z == z.p.left   #case 2
              z = z.p
              RIGHT-ROTATE(T, z)
            z.p.color = BLACK     #case 3
            z.p.p.color = RED
            LEFT-ROTATE(T, z.p.p)

