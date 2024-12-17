import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (data: ArticleStateType) => {
		setStyleState(data);
	};

	return (
		<main
			className={styles.main}
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
