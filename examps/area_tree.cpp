#include <stdio.h>

class point{
public:
  int x;
  int y;
  point( int x, int y ){
    this->x = x;
    this->y = y;
  }
};

class list_node{
public:
  point* end_point;
  list_node *next;
  list_node *prev;

  list_node( point* ptr ){
    this->end_point = ptr;
    this->next = NULL;
    this->prev = NULL;
  }
};

class binary_tree_node{
public:
  //left sub binary tree
  binary_tree_node* left;
  //right sub binary tree
  binary_tree_node* right;
  //flag - is end point
  bool is_end_point;
  //decided by flag which named is_end_point
  //false - other dimension sub-tree
  //true - end-point
  void* ptr;
  //mid range
  int range_begin;
  int range_end;

  //create non-end-point
  binary_tree_node(int b, int e ){
    this->left = NULL;
    this->right = NULL;
    this->is_end_point = false;
    this->range_begin = b;
    this->range_end = e;
  }

  binary_tree_node( list_node* e ){
    this->left = NULL;
    this->right = NULL;
    this->is_end_point = true;
    this->ptr = e;
  }
  //get link-node if it's a end-point
  list_node* end_point(  ){
    return ( list_node* )( this->ptr );
  }
  //get sub binary-tree if it's a non-end-point
  binary_tree_node* sub_binary_tree(  ){
    return ( binary_tree_node* )( this->ptr );
  }
};

//stupid method to build fist-step's balanced-binary-tree!

//build a unsorted link-list return link-list's header point address
list_node* reading_build_first_link(  );

//sort link-list by point's x
void sort_link_list_by_x( list_node* );
//sort link-list by point's y
void sort_link_list_by_y( list_node* );
//copy sub-link-list
list_node* copy_list( list_node*, list_node* );
//build a first-step balanced binary-tree
//return balanced binary-tree root point address
binary_tree_node* build_fist_step_binary_tree( list_node* );

void DEBUG_display_list( list_node* );

int main(){
  list_node* header = reading_build_first_link(  );
  sort_link_list_by_x( header );
  DEBUG_display_list( header );
  
  return 0;
}

list_node* reading_build_first_link(  ){
  list_node* header = NULL;
  list_node* pointer = NULL;
  int x, y;
  while( scanf( "%d%d", &x, &y ) != EOF ){
    //build list node
    list_node* cr_node = new list_node( new point( x, y ) );
    if( header == NULL ){
      //create list header
      header = cr_node;
      pointer = header;
    }
    else{
      //append list
      pointer->next = cr_node;
      cr_node->prev = pointer;
      pointer = cr_node;
    }
  }
  return header;
}


//I don't want to explain this shit what to do
void sort_link_list_by_x( list_node* header ){
  list_node* tail = header;
  while( tail->next != NULL ) tail = tail->next;

  for( list_node* f_ptr = header; f_ptr->next != tail;
       f_ptr = f_ptr->next){
    for( list_node* s_ptr = tail; s_ptr->prev != f_ptr;
         s_ptr = s_ptr->prev ){
      if( s_ptr->end_point->x < s_ptr->prev->end_point->x ){
        point* tmp = s_ptr->prev->end_point;
        s_ptr->prev->end_point = s_ptr->end_point;
        s_ptr->end_point = tmp;
      }
    }
  }
}

//I don't want to explain this shit what to do
void sort_link_list_by_y( list_node* header ){
  list_node* tail = header;
  while( tail->next != NULL ) tail = tail->next;

  for( list_node* f_ptr = header; f_ptr->next != tail;
       f_ptr = f_ptr->next){
    for( list_node* s_ptr = tail; s_ptr->prev != f_ptr;
         s_ptr = s_ptr->prev ){
      if( s_ptr->end_point->y < s_ptr->prev->end_point->y ){
        point* tmp = s_ptr->prev->end_point;
        s_ptr->prev->end_point = s_ptr->end_point;
        s_ptr->end_point = tmp;
      }
    }
  }
}


void DEBUG_display_list( list_node* header ){
  for(list_node* ptr = header;
      ptr != NULL;
      ptr = ptr->next){
    printf("(%d, %d)->", ptr->end_point->x, ptr->end_point->y);
  }
}


list_node* copy_list( list_node* head, list_node* tail ){
  list_node* header = NULL;
  list_node* pointer = NULL;
  for( list_node* ptr = head; ptr != tail->next; ptr = ptr->next ){
    list_node* cr_node = new list_node( ptr->end_point );
    if( header ){
      pointer->next = cr_node;
      cr_node->prev = pointer;
      pointer = cr_node;
    }
    else{
      header = cr_node;
      pointer = header;
    }
  }

  return header;
}

binary_tree_node* build_fist_step_binary_tree( list_node* header ){
  
}
