import clsx from 'clsx';
import { CSSProperties, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import { Article } from './components/article/Article';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (data: ArticleStateType) => {
		setStyleState(data);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialState={defaultArticleState}
				handleChange={handleChange}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
