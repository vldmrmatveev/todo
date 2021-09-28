<template>
	<div class="container pt-8 sm:pt-24">
		<div class="flex flex-wrap -mx-3">
			<div class="w-full sm:w-4/12 px-3 lg:w-3/12 sm:-mt-6 mb-6">
				<Filter
					@pushCard="addCard"
					@sortByName="sortCardByName"
					@changeStatus="changeCardsStatus"
				/>
			</div>
			<div class="w-full sm:w-8/12 lg:w-9/12 px-3 mb-6">
				<!-- <Content :cards="cards" @removeItem="removeCard" /> -->
				<Content :cards="sortedCards" @removeItem="removeCard" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Card from './types/Card';
import Filter from './components/Filter.vue';
import Content from './components/Content.vue';

export default defineComponent({
	name: 'App',
	components: {
		Filter,
		Content
	},
	setup() {
		const search = ref('');
		const status = ref('all');
		const cards = ref<Card[]>([
			{ id: 1, title: '№1', text: 'описание задачи', checked: true },
			{ id: 2, title: '№2', text: 'описание задачи 2', checked: false }
		]);
		const filterByName = (card: Card) => {
			if (search.value === '') {
				return card;
			} else {
				return card.title.includes(search.value);
			}
		};
		const filterByChecked = (card: Card) => {
			switch (status.value) {
				case 'all':
					return card;
				case 'complete':
					return card.checked === true;
				case 'incomplete':
					return card.checked === false;
			}
		};
		const sortedCards = computed(() => {
			return cards.value.filter(card => {
				if (filterByChecked(card) && filterByName(card)) {
					return card;
				}
			});
		});

		return { cards, sortedCards, search, status };
	},
	methods: {
		changeCardsStatus(status: string) {
			this.status = status;
		},
		sortCardByName(searchValue: string) {
			this.search = searchValue;
		},
		removeCard(idValue: number) {
			this.cards = this.cards.filter(card => card.id !== idValue);
		},
		addCard(title: string, text: string) {
			const newCard: Card = {
				id: Math.floor(Math.random() * 1000),
				title,
				text,
				checked: false
			};
			this.cards.push(newCard);
		}
	}
});
</script>

<style lang="scss">
html {
	background-color: rgba(255, 250, 240, 0.4);
}
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
