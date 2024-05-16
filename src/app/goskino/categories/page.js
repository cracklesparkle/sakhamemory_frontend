'use client'
import React, { useState, useEffect } from 'react';
import BlockQuote from '../../components/BlockQuote';
import styles from '../page.module.scss'
import ContentHeader from '../../components/ContentHeader';
import Link from 'next/link';
import { Inter } from 'next/font/google'
const font = Inter({ subsets: ["cyrillic-ext"] })

const MovieCategories = () => {
    const [categories, setCategories] = useState([])

    const quote1 = 'Государственное национальное хранилище кинодокументов о Республике Саха (Якутия) создано в 1996 г. в целях сохранения аудиовизуального наследия республики. В 1997 г. Указом президента РС(Я) фонды Госкинохранилища признаны особо ценным объектом национального культурного достояния народов РС(Я). В настоящее время хранится более 11 тысяч фильмов, сюжетов и фрагментов о Якутии. Работа ведется в тесном сотрудничестве с Российским кинофотоархивом и Российским государственным гуманитарным университетом.'
    const quote2 = 'Деятельность Госкинохранилища основывается на программах последовательного развития: «Внедрение международных стандартов качества и хранения кинодокументов» и межотраслевой программы «Память Якутии». К финансированию деятельности привлекаются и внебюджетные средства.'
    const quote3 = 'Как республиканский информационный центр Госкинохранилище ведет большую издательскую деятельность: 5 томов Каталога фонда, 4 тома книги «Люди за кадром», несколько книг о кинематографистах республики. Создан Музей кинематографии РС(Я). На НВК «Саха» постоянно ведется цикл телепередач с использованием фондовых материалов.'
    const quote4 = 'Организована и проведена Республиканская научно-практическая конференция «Кинематография РС(Я): перспективы развития в ХХ1 веке», приняли участие в нескольких семинарах и конференциях, в том числе и семинаре ЮНЕСКО.'
    const quote5 = 'В целях привлечения широких кругов общественности к сбору кинодокументов ежегодно проводится конкурс «Кинолетопись Якутии».'
    const quote6 = 'К 60-летию Победы создан Республиканский архив кинодокументов якутян-участников Великой отечественной войны. Каждому ветерану к юбилейной дате подготовлен подарочный набор видеофильмов.'
    const quote7 = 'Наш адрес: 677015 г. Якутск, ул.С.Данилова, 13'
    const quote8 = 'Тел/факс (411-2) 44-88-61'
    const quote9 = 'E-mail: gnhkd@mail.ru'
    const quote10 = 'Директор – Пестерев Василий Васильевич'

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movie categories');
                }
                const data = await response.json()
                setCategories(data)
            } catch (error) {
                console.error('Error fetching movie categories:', error);
            }
        };

        fetchMovies()
    }, [])

    return (
        <div className={`${styles.page} ${font.className}`}>
            <ContentHeader header={'Кинодокументы'} />
            <div className={styles.categories}>
                {categories.length > 0 && categories.map(category => {
                    if (category.parent == 1) {
                        return (
                            <Link href={`/goskino/movie/${category.name}`}>
                                {category.name}
                            </Link>
                        )
                    }
                }
                )}
            </div>
        </div>
    );
};

export default MovieCategories;