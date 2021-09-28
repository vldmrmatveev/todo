<template>
	<div v-if="cards.length > 0" class="flex flex-wrap -mx-2">
		<div
			class="w-full sm:w-1/2 lg:w-1/3 xl:w-3/12 px-2 mb-6"
			v-for="card in cards"
			:key="card.id"
		>
			<div
				class="bg-yellow-200 rounded-lg p-5 hover:bg-yellow-400 duration-200 hover:shadow-lg relative"
			>
				<button
					v-if="card.checked"
					class="close-btn text-yellow-900 duration-200 hover:text-yellow-600"
					@click="removeItem(card.id)"
				></button>
				<h5 class="text-xl mb-2 font-bold">{{ card.title }}</h5>
				<p class="text-sm mb-4">{{ card.text }}</p>
				<input
					hidden
					type="checkbox"
					:id="'checkbox-' + card.id"
					v-model="card.checked"
				/>
				<label
					:for="'checkbox-' + card.id"
					class="flex items-center cursor-pointer"
				>
					<span
						class="custom-checkbox text-yellow-600 rounded-full w-4 h-4 border-2 border-yellow-600 block mr-2"
					></span>
					<span class="text-xs" v-if="card.checked">Выполнено</span>
					<span class="text-xs" v-else>Не выполнено</span>
				</label>
			</div>
		</div>
	</div>
	<div class="h-full flex items-center justify-center" v-else>
		<div class="text-xl font-bold text-center">
			Карточек больше нет, необходимо создать новые, или изменить параметры
			фильтра
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Card from '../types/Card';

export default defineComponent({
	name: 'Content',
	emits: ['removeItem'],
	props: {
		cards: {
			type: Array as PropType<Card[]>,
			required: true
		}
	},
	methods: {
		removeItem(id: number) {
			this.$emit('removeItem', id);
		}
	}
});
</script>

<style lang="scss" scoped>
.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 15px;
	height: 15px;
	&:before,
	&:after {
		content: '';
		width: 100%;
		height: 2px;
		background-color: currentColor;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(-45deg);
	}
}
.custom-checkbox {
	position: relative;
	&:before {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		position: absolute;
		margin: auto;
		background-color: currentColor;
		border-radius: inherit;
		opacity: 0;
	}
}
input[type='checkbox']:checked + label {
	.custom-checkbox {
		&:before {
			opacity: 1;
		}
	}
}
</style>
