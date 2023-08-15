import styles from './collectionList.module.scss';

interface CollectionListProps {
  collections: string[];
  collectionSelected?: string;
  onClick?: (collection: string) => void;
}

const CollectionList = ({ collections, collectionSelected, onClick }: CollectionListProps) => {
  return (
    <ul className={styles.collection_list}>
      {collections.map((collection) => (
        <li 
          key={collection}
          onClick={() => onClick && onClick(collection)}
          className={`${styles.item} ${collectionSelected === collection ? styles.selected : ''}`}
        >
          {collection}
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;