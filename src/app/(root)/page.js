// import Image from "next/image";
// import styles from "./page.module.scss";
// import Hero from "../components/Hero";
// import BlockQuote from "../components/BlockQuote";
// import { Card, Divider, Paper } from "@mantine/core";

// export default function Home() {
//   const quote1 = 'Портал «Память Якутии» - это информационный продукт, результат реализации программы «Память Якутии» (2002-2006 гг.), утвержденной постановлением Правительства Республики Саха (Якутия) № 116 от 2 марта 2001 г. Основная цель программы – сохранение документального наследия народов Якутии как части мирового культурного наследия и обеспечение доступа к нему на основе современных информационных технологий.'
//   const quote2 = 'Портал «Память Якутии» предоставляет свободный доступ к ценным и редким документам из фондов Национальной библиотеки Республики Саха (Якутия), Национального архива Республики Саха (Якутия), Государственного объединенного музея истории и культуры народов Севера им. Е. М. Ярославского, Государственного национального хранилища кинодокументов о Республике Саха (Якутия). Для зарубежных пользователей разработана версия на английском языке (Eng. version).'
//   const quote3 = 'Книжные памятники Якутии представлены электронными копиями оригиналов первых книг на якутском языке, наиболее ценных дореволюционных изданий о Якутии. Материал сопровождается научными комментариями по истории якутской книги, опубликован полный репертуар якутской книги за 1812-1916 гг.'
//   const quote4 = 'В разделе Национальная библиография Республики Саха (Якутия) представлены основные библиографических пособий о Якутии, среди которых «Библиография Якутии» Н.Н. Грибановского, «Летопись печати Якутии» и др.'
//   const quote5 = 'Уникальные и особо ценные документы архивного фонда Республики Саха (Якутия) знакомят с документами Якутской воеводской канцелярии (1701-1823), Якутской провинциальной канцелярии (1778-1892), Якутского канцелярского комиссара (1766), Якутской Степной Думы (1827-1860), Якутского губернатора (1862-1919), Якутского областного управления (1805-1909), Якутского областного стряпчего (1815-1851), Якутского областного по городским делам присутствия, а также с документальными памятниками общественно-политической мысли Якутии XVIII-XX вв.'
//   const quote6 = 'Фотолетопись Якутии представляют фотографии конца XIX – начала XX вв., отражающие наиболее значимые события и факты из истории и культуры Якутии. Работа велась по следующим тематическим блокам: общественно-политическая жизнь края, культурная жизнь Якутии, промышленность и торговля в Якутии, традиционные виды хозяйства народов Якутии, земледелие Якутии, образование и здравоохранение Якутии, история ссылки, научные экспедиции, православие Якутии, традиционные верования Якутии и др.'
//   const quote7 = 'В разделе Кинолетопись Якутии представлено 60 фильмов из фондов Государственного национального хранилища кинодокументов о Республике Саха (Якутия), раскрывающие различные периоды истории и культуры Якутии. Значительная часть фильмов является уникальной и ценной по своей исторической и культурной значимости, что представляет большой интерес не только для населения республики, но и российского и зарубежного потребителя. Редкие кадры кинохроники собраны в коллекциях «Олонхо», «Якутские алмазы», «Река Лена» и др.'
//   const quote8 = '«Голоса века»: музыкальное и звуковое наследие народов Республики Саха (Якутия)” представляют редкие записи якутской музыки и фольклора в исполнении мастеров народного творчества (олонхосутов, тойуксутов, хомусистов) и артистов.'
//   const quote9 = 'Портал «Память Якутии» призван способствовать распространению знаний об истории и богатом культурном наследии Якутии, формированию положительного имиджа Республики Саха (Якутия) в России и за рубежом.'

//   return (
//     <main className={styles.main}>
//       <Hero />

//       <div className={styles.content}>
//         <div className={styles.row}>
//           <BlockQuote title={'О портале'} content={quote1} />

//           <div className={styles.row_image}>
//             <img src="/static/home/pillars.jpg"></img>
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.row_image}>
//             <img src="/static/home/movie.png"></img>
//           </div>
//           <BlockQuote content={quote2} />
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <BlockQuote title={'Книжные памятники'} content={quote3} />
//           <div className={styles.row_image}>
//             <img src="/static/home/books.png"></img>
//           </div>
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <div className={styles.row_image}>
//             <img src="/static/home/books.png"></img>
//           </div>
//           <BlockQuote content={quote4} />
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <BlockQuote content={quote5} />
//           <div className={styles.row_image}>
//             <img src="/static/home/books.png"></img>
//           </div>
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <div className={styles.row_image}>
//             <img src="/static/home/books.png"></img>
//           </div>
//           <BlockQuote content={quote6} />
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <BlockQuote content={quote7} />
//           <div className={styles.row_image}>
//             <img src="/static/home/books.png"></img>
//           </div>
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <div className={styles.row_image}>
//             <img src="/static/home/books.png"></img>
//           </div>
//           <BlockQuote content={quote8} />
//         </div>

//         <Divider />

//         <div className={styles.row}>
//           <Paper shadow="xs" p="xl">
//             <BlockQuote content={quote9} />
//           </Paper>
//         </div>
//       </div>



//     </main>
//   );
// }

export { default, generateMetadata } from "./[...puckPath]/page";