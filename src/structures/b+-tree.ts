// 단말노드는 ceil( N-1 / 2 ) 최소 자식 수
// 내부노드는 ceil( N / 2) 최소 자식 수
class Node {
  public parent: Node | null = null
  public searchKeys: Array<string | null>
  public children: Array<Node | null>

  public isRootNode: boolean = false
  public isLeafNode: boolean = false
  public lastIndex: number = -1 // null이 아닌 값 기준 ex) [1,2,null] -> 1

  constructor(
    maxSize: number,
    isLeafNode: boolean = false,
    isRootNode: boolean = false
  ) {
    this.searchKeys = Array.from({ length: maxSize - 1 }, () => null)
    // 리프 노드일 경우 마지막 노드는 오른쪽 리프 노드를 가르킴
    this.children = Array.from({ length: maxSize }, () => null)
    this.isLeafNode = isLeafNode
    this.isRootNode = isRootNode
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
  private degree: number = 4

  constructor(iter: Iterable<any> | null = null, degree: number = 4) {
    this.degree = degree
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
        // internal node에는 자식 노드가 최소 1개 이상 있음. ( floor(n/2)) )
        currentNode = currentNode.lastChild as Node
        continue
      }

      // searchKey = K[i]
      if (searchKey === currentNode.searchKeys[i]) {
        currentNode = currentNode.children[i + 1] as Node
        continue
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
    if (this.root === null) this.root = new Node(this.degree, true)

    const leafNode = this.findLeafNode(searchKey)

    // leafNode가 가득 차있지 않다면 리프노드에 insert
    if (!leafNode.isFull) return this.insertIntoLeaf(leafNode, searchKey, item)

    // leafNode가 가득 차있다면, split이 필요함.

    // NewNode 생성
    // LeafNode의 사본 Temp 생성 (깊복)
    // LeafNode에 새로운 값 삽입

    // NewNode.items[lastIndex] = LeafNode.items[lastIndex]
    // LeafNode.items[lastIndex] = Temp
    // LeafNode에서 items을 초기화.lastItem 제외

    // Temp.items[0~n/2-1]을 복사해 LeafNode.items로 넣는다
    // Temp.items[n/2~n]을 복사해 NewLeaf.items로 넣는다

    // middleKey = smallest(NewLeaf.items)
    // insertIntoParent(LeafNode, middleKey, newLeaf)
  }

  private insertIntoLeaf(leafNode: Node, searchKey: string, item: any) {
    // searchKey는 L.K[i] 보다 크거나 같고 L.K[i+1]보다 작거나 같을 수 있음.
    // 크면 i+1, 작거나 같으면 그 자리에 searchKey가 들어가고, 나머지 값은 뒤로 밀림.
    for (let i = 0; i <= leafNode.lastIndex; i++) {
      if (searchKey <= (leafNode.searchKeys[i] as string)) {
        leafNode.searchKeys = [
          ...leafNode.searchKeys.slice(0, i),
          searchKey,
          ...leafNode.searchKeys.slice(i)
        ]
        // <=searchKey arr + item + >searchKey arr + nextNode
        leafNode.children = [
          ...leafNode.children.slice(0, i),
          item,
          ...leafNode.children.slice(i, leafNode.lastIndex - 1),
          leafNode.children.at(-1)
        ]
        return
      }
    }
  }

  private insertIntoParent(node: Node, middleKey: string, newNode: Node) {
    // LeafNode가 root라면
    //    newRootNode 생성 children = [LeafNode, middleKey, newLeafNode]
    //    root = newRootNode
    //    return
    // ParentNode = parent(LeafNode)
    // if ParentNode가 가득 차있지 않다면
    //    (middleKey, newLeafNode) 쌍을 부모노드의 NodeLeaf key 뒤에 삽입
    // else
    //
  }
}
