class Node {
  public searchKeys: Array<string | null>
  public children: Array<Node | null>

  public isLeafNode: boolean = false
  public lastIndex: number = -1 // null이 아닌 값 기준 ex) [1,2,null] -> 1

  constructor(maxSize: number, isLeafNode: boolean = false) {
    this.searchKeys = Array.from({ length: maxSize - 1 }, () => null)
    // 리프 노드일 경우 마지막 노드는 오른쪽 리프 노드를 가르킴
    this.children = Array.from({ length: maxSize }, () => null)
    this.isLeafNode = isLeafNode
  }

  public get isEmpty() {
    return this.lastIndex === -1
  }

  public get isFull() {
    return this.lastIndex === this.searchKeys.length - 1
  }

  public get lastChild() {
    return this.children.at(this.lastIndex) as Node | null
  }

  public findGteIndex(searchKey: string) {
    if (this.isEmpty) return -1
    return (this.searchKeys as string[]).findIndex((key) => key >= searchKey)
  }
}

export class BTree {
  private root: Node | null = null
  private maxNodeSize: number = 4

  constructor(iter: Iterable<any> | null = null, maxNodeSize: number = 4) {
    this.maxNodeSize = maxNodeSize
    if (iter) {
      for (const item of iter) {
        // this.insert(item)
      }
    }
  }

  // 무조건 리프 노드를 찾아야함.
  private findLeafNode(searchKey: string): Node {
    if (this.root === null) throw new Error('root is null')

    let currentNode = this.root

    while (!currentNode.isLeafNode) {
      // 현재 노드의 자식 노드에서 어떤 i번째 노드를 탐색할지 찾는다.
      const i = currentNode.findGteIndex(searchKey)

      if (i === -1) {
        // internal node에는 자식 노드가 최소 1개 이상 있음.
        currentNode = currentNode.lastChild as Node
        continue
      }

      // searchKey = K[i]
      if (searchKey === currentNode.searchKeys[i]) {
        // 검색 키가 같은 child를 찾았다면 C[i+1]가 isLeafNode가 될 때 까지
        // C[0]를 참조하면 리프 노트를 가르킴
        function digLeafNode(node: Node): Node {
          if (node.isLeafNode) return node
          return digLeafNode(node.children[0] as Node)
        }

        return digLeafNode(currentNode.children[i + 1] as Node)
      }

      // searchKey < K[i]
      currentNode = currentNode.children[i] as Node
    }

    return currentNode
  }

  public find(searchKey: string) {
    if (this.root === null) return null

    const leafNode = this.findLeafNode(searchKey)

    for (let i = 0; i <= leafNode.lastIndex; i++) {
      if (searchKey === leafNode.searchKeys[i]) {
        return leafNode.children[i]
      }
    }

    return null
  }

  public insert(searchKey: string, item: any) {
    if (this.root === null) this.root = new Node(this.maxNodeSize, true)

    const leafNode = this.findLeafNode(searchKey)

    // leafNode가 가득 차있지 않다면 리프노드에 insert
    if (!leafNode.isFull) return this.insertIntoLeaf(leafNode, searchKey, item)

    // leafNode가 가득 차있다면, split이 필요함.
    const newLeafNode = new Node(this.maxNodeSize, true)

    const temp = []
    for (let i = 0; i <= leafNode.lastIndex; i++) {
      temp.push([leafNode.children[i], leafNode.searchKeys[i]])
    }
  }

  private insertIntoLeaf(leafNode: Node, searchKey: string, item: any) {
    // searchKey는 L.K[i] 보다 크거나 같고 L.K[i+1]보다 작거나 같을 수 있음.
    // 크면 i+1, 작거나 같으면 그 자리에 searchKey가 들어가고, 나머지 값은 뒤로 밀림.
    for (let i = 0; i <= leafNode.lastIndex; i++) {
      if (searchKey <= (leafNode.searchKeys[i] as string)) {
        leafNode.searchKeys.splice(i, 0, searchKey).pop()
        leafNode.children.splice(i, 0, item) // 꽉 찼을 떄 이 메서드 실행이 되나?
        return
      }
    }
  }

  private insertIntoParent(
    leafNode: Node,
    middleKey: string,
    newLeafNode: Node
  ) {
    //
  }
}
