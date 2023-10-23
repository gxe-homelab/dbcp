<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Button
	} from 'flowbite-svelte';
	import { CirclePlusSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Table hoverable={true}>
	<caption
		class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
	>
		<div class="flex justify-between items-center">
			<div>
				Users
				<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
					All the users created through this interface.
				</p>
			</div>

			<div class="flex justify-center items-center gap-3">
				<Button color="dark" size="sm" class="flex items-center gap-2">
					<CirclePlusSolid size="sm" />
					Create
				</Button>

				<Button disabled color="red" size="sm" class="flex items-center gap-2">
					<TrashBinSolid size="sm" />
					Delete
				</Button>
			</div>
		</div>
	</caption>

	<TableHead>
		<TableHeadCell class="!p-4">
			<Checkbox />
		</TableHeadCell>
		<TableHeadCell>Username</TableHeadCell>
		<TableHeadCell>Password</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
	</TableHead>

	<TableBody class="divide-y">
		{#if data.users.length > 0}
			{#each data.users as user (user.id)}
				<TableBodyRow>
					<TableBodyCell class="!p-4">
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
					<TableBodyCell>Sliver</TableBodyCell>
					<TableBodyCell>Laptop</TableBodyCell>
					<TableBodyCell>$2999</TableBodyCell>
					<TableBodyCell>
						<a
							href="/tables"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		{/if}
	</TableBody>
</Table>

<div class="px-4">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus ex, tempora placeat
	voluptates deleniti quisquam provident molestias odio consequatur, quis voluptas quae. Fugit
	maxime maiores autem explicabo laboriosam recusandae deserunt, hic dolores nam necessitatibus
	debitis sunt eligendi quia voluptate voluptas, harum veniam iusto accusamus consequuntur
	distinctio ab sapiente architecto! Eligendi, temporibus explicabo ex assumenda doloremque vel quas
	officia eveniet, necessitatibus quod quidem facere non vero id. Sint temporibus in similique
	dolorem corrupti? Totam quasi, qui est eos molestiae, ullam quam incidunt commodi in doloremque
	omnis culpa optio vel maxime et velit fugiat corporis quia. Natus enim repudiandae quos aut.
</div>
