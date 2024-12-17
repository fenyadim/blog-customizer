import clsx from 'clsx';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormType = {
	initialState: ArticleStateType;
	handleChange: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	handleChange,
}: ArticleParamsFormType) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleMouseDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, []);

	const onChange = (params: keyof ArticleStateType) => (option: OptionType) => {
		setFormState({
			...formState,
			[params]: option,
		});
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		handleChange(formState);
	};

	const onReset = () => {
		setFormState(initialState);
		handleChange(initialState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form onSubmit={onSubmit} className={styles.form}>
					<div className={styles.content}>
						<Text weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={onChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='Размер шрифта'
							onChange={onChange('fontSizeOption')}
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={onChange('fontColor')}
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={onChange('backgroundColor')}
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={onChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
