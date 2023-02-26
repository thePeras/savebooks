import Image from 'next/image'
import styles from '@/styles/Home.module.css'

const categories = [
  {
    id: 1,
    name: "Favourites",
    icon: "star-line.svg"
  },
  {
    id: 2,
    name: "To Read",
    icon: "book-mark-line.svg"
  },
  {
    id: 3,
    name: "Reading",
    icon: "book-open-line.svg"
  },
  {
    id: 4,
    name: "Have read",
    icon: "check-double-line.svg"
  },
]

export default function Home() {
  return (
    <>
      <main>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div key={category.id} className={styles.outerCategoryItem}>
              <div className={styles.categoryItem}>
                <Image src={category.icon}height={30} width={30} />
                <p>{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
