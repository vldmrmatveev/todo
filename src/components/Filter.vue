<template>
	<div class="pb-4">
		<label for="search" class="block mb-1 text-sm text-gray-700"
			>Поиск по названию:</label
		>
		<input
			type="text"
			name="search"
			id="search"
			placeholder="Введите значение"
			autocomplete="off"
			v-model.trim="search"
			@keyup.enter="sortByName(search)"
			class="bg-white rounded-md border-2 border-yellow-400 outline-none px-4 py-2 duration-200 hover:border-yellow-500 w-full mb-2"
		/>
		<button
			class="bg-yellow-400 rounded-md border-0 outline-none px-4 py-4 duration-200 hover:bg-yellow-500 w-full text-white text-xs uppercase font-black"
			@click="sortByName(search)"
		>
			Искать
		</button>
	</div>
	<div class="pb-4">
		<label class="block mb-1 text-sm text-gray-700"
			>Сортировать по выполнению:</label
		>
		<div
			class="custom-select bg-white rounded-md border-2 border-yellow-400 outline-none duration-200 w-full mb-2 cursor-pointer"
			@click="open = !open"
		>
			<div
				class="custom-select__selected px-4 py-2"
				:class="{ 'text-gray-400': selected.value == 'none' }"
			>
				{{ selected.title }}
				<span
					class="custom-select__selected-dropdown text-yellow-600"
					:class="{ open: open }"
				></span>
			</div>
			<ul
				class="custom-select__list border-t-2 border-yellow-400"
				:class="{ open: open }"
			>
				<li
					v-for="(check, i) in checked"
					:key="check.value"
					@click="changeStatus(check)"
					class="px-4 py-2 hover:bg-yellow-100 duration-200"
					:class="{ 'border-b-2 border-yellow-400': i != checked.length - 1 }"
				>
					{{ check.title }}
				</li>
			</ul>
		</div>
	</div>
	<button
		v-if="!openModal"
		class="bg-yellow-400 rounded-md border-0 outline-none px-4 py-4 duration-200 hover:bg-yellow-500 w-full mb-6 text-white text-xs uppercase font-black"
		@click="openModal = !openModal"
	>
		Создать новую задачу
	</button>
	<button
		v-else
		class="bg-gray-400 rounded-md border-0 outline-none px-4 py-4 w-full mb-6 text-white text-xs uppercase font-black cursor-default"
		disabled
		@click="openModal = !openModal"
	>
		Создать новую задачу
	</button>
	<transition name="slide-fade">
		<div v-if="openModal" class="w-full p-6 shadow-xl bg-white">
			<div class="text-xl font-bold mb-4">Создание новой задачи</div>
			<div class="pb-3">
				<label for="createName" class="block mb-1 text-sm text-gray-700"
					>Название</label
				>
				<input
					type="text"
					name="createName"
					id="createName"
					v-model="createName"
					placeholder="Введите название"
					autocomplete="off"
					class="bg-white rounded-md border-2 outline-none px-4 py-2 duration-200 w-full mb-2"
					:class="{
						'border-red-600 hover:border-red-700': !validate,
						'hover:border-yellow-500 border-yellow-400': validate
					}"
				/>
				<p class="text-xs text-red-600 mb-2" v-if="!validate">
					Необходимо ввести не менее 4х символов
				</p>
			</div>
			<div class="pb-3">
				<label for="createText" class="block mb-1 text-sm text-gray-700"
					>Описание</label
				>
				<input
					type="text"
					name="createText"
					id="createText"
					v-model="createText"
					placeholder="Введите описание"
					autocomplete="off"
					class="bg-white rounded-md border-2 border-yellow-400 outline-none px-4 py-2 duration-200 hover:border-yellow-500 w-full mb-2"
				/>
			</div>
			<button
				class="bg-yellow-400 rounded-md border-0 outline-none px-4 py-4 duration-200 hover:bg-yellow-500 w-full mb-4 text-white text-xs uppercase font-black"
				@click="pushCard(createName, createText)"
			>
				Создать
			</button>
			<button
				class="border-2 bg-white border-yellow-400 rounded-md border-0 outline-none px-4 py-3 duration-200 hover:border-yellow-500 w-full text-yellow-400 hover:text-yellow-500 text-xs uppercase font-black"
				@click="openModal = !openModal"
			>
				Отменить
			</button>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StatusList from '../types/StatusList';

export default defineComponent({
	name: 'Filter',
	emits: ['pushCard', 'sortByName', 'changeStatus'],
	setup() {
		const createName = ref('');
		const validate = ref(true);
		const createText = ref('');
		const open = ref(false);
		const search = ref('');
		const openModal = ref(false);
		const selected = ref<StatusList>({ value: 'none', title: 'Статус' });
		const checked = ref<StatusList[]>([
			{ value: 'all', title: 'Все' },
			{ value: 'complete', title: 'Выполненные' },
			{ value: 'incomplete', title: 'Не выполненные' }
		]);
		return {
			selected,
			open,
			checked,
			search,
			openModal,
			createName,
			createText,
			validate
		};
	},
	methods: {
		changeStatus(checked: StatusList) {
			this.selected.title = checked.title;
			this.selected.value = checked.value;
			this.$emit('changeStatus', checked.value);
		},
		sortByName(search: string) {
			this.$emit('sortByName', search);
		},
		pushCard(title: string, text: string) {
			this.validate = this.doValidate(title);
			if (this.validate) {
				this.$emit('pushCard', title, text);
				this.closeModal();
			}
		},
		doValidate(title: string) {
			if (title.length >= 4) {
				return true;
			}
			return false;
		},
		closeModal() {
			this.openModal = false;
			this.createName = '';
			this.createText = '';
		}
	}
});
</script>

<style lang="scss" scoped>
.custom-select {
	&__selected {
		position: relative;
		&-dropdown {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 10px;
			width: 10px;
			height: 10px;
			margin: auto;
			transition: 0.2s ease all;
			&:before,
			&:after {
				content: '';
				height: 2px;
				position: absolute;
				top: 4px;
				right: 0;
				left: 0;
				width: 7px;
				background-color: currentColor;
			}
			&:before {
				transform: rotate(45deg);
			}
			&:after {
				transform: rotate(-45deg);
				left: auto;
			}
			&.open {
				transform: rotate(180deg);
			}
		}
	}
	&__list {
		display: none;
		&.open {
			display: block;
		}
	}
}

.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(-20px);
	opacity: 0;
}
</style>
