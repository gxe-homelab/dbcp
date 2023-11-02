<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { LayoutData } from './$types';
	import {
		IconSettings,
		IconDatabase,
		IconUsers,
		IconDashboard,
		IconChevronDown,
		IconUserCircle,
		IconLogout2,
		IconPlugConnected,
		IconUserPlus,
		IconDatabasePlus
	} from '@tabler/icons-svelte';

	const NAV_DATABASE = 'database';
	const NAV_USER = 'user';

	let expanded: string | null;

	export let data: LayoutData;
</script>

<!-- <aside class="w-80 p-4 max-h-screen sticky top-0">
	<div class="bg-neutral-800/50 h-full p-3 pt-5 rounded-lg flex flex-col gap-10">
		<h1 class="text-center font-bold text-2xl">ACME</h1>

		<nav class="flex flex-col gap-2 h-full text-neutral-500">
			<a
				on:click={() => (expanded = null)}
				href="/"
				class="flex gap-2 p-2 hover:bg-zinc-200/10 rounded-md"
			>
				<IconDashboard />

				<span>Dashboard</span>
			</a>

			<button
				on:click={() => (expanded = expanded == NAV_DATABASE ? null : NAV_DATABASE)}
				class="flex items-center gap-2 p-2 hover:bg-zinc-200/10 rounded-md {expanded == NAV_DATABASE
					? ' text-lime-300'
					: ''}"
			>
				<IconDatabase />
				<span class="grow text-left">Database</span>

				<IconChevronDown
					size={18}
					class={'transition-transform ' + (expanded == NAV_DATABASE ? 'rotate-180' : '')}
				/>
			</button>

			{#if expanded == NAV_DATABASE}
				<div
					class="ml-4 pl-2 border-l-2 border-neutral-300 border-opacity-40 flex flex-col"
					transition:slide
				>
					{#each data.databases as db (db.oid)}
						{#if !db.datistemplate}
							<a
								on:click={() => (expanded = null)}
								href="/database/{db.datname}"
								class="py-2 px-2.5 text-sm hover:bg-zinc-200/10 rounded-md"
							>
								{db.datname}
							</a>
						{/if}
					{/each}
				</div>
			{/if}

			<button
				on:click={() => (expanded = expanded == NAV_USER ? null : NAV_USER)}
				class="flex items-center gap-2 p-2 hover:bg-zinc-200/10 rounded-md {expanded == NAV_USER
					? ' text-lime-300'
					: ''}"
			>
				<IconUsers />
				<span class="grow text-left">Users</span>

				<IconChevronDown
					size={18}
					class={'transition-transform ' + (expanded == NAV_USER ? 'rotate-180' : '')}
				/>
			</button>

			{#if expanded == NAV_USER}
				<div
					class="ml-5 pl-2 border-l-2 border-neutral-300 border-opacity-40 flex flex-col"
					transition:slide
				>
					{#each data.users as user (user.oid)}
						<a
							on:click={() => (expanded = null)}
							href="/user/{user.rolname}"
							class="py-2 px-2.5 text-sm hover:bg-zinc-200/10 rounded-md"
						>
							{user.rolname}
						</a>
					{/each}
				</div>
			{/if}

			<h class="grow" />

			<a href="/settings" class="flex gap-2 p-2 hover:bg-zinc-200/10 rounded-md">
				<IconSettings />
				<span>Settings</span>
			</a>

			<button class="flex gap-2 p-2 group hover:bg-zinc-200/10 rounded-md">
				<IconUserCircle class="group-hover:hidden" />
				<IconLogout2 class="group-hover:block hidden" />
				<span class="capitalize">Username</span>
			</button>
		</nav>
	</div>
</aside>

<main class="grow flex flex-col">
	<section class="grow py-4">
		<slot />
	</section>

	<footer class="text-center p-1 my-4 rounded-md bg-neutral-800/50">footer</footer>
</main> -->

<main class="max-w-screen-lg w-full mx-auto px-2">
	<header class="flex flex-row justify-between py-2">
		<h1 class="text-xl font-semibold">ACME</h1>

		<nav class="flex flex-row gap-5 text-sm">
			<button class="flex items-center gap-1 hover:text-stone-400 transition-colors">
				<IconUserPlus />
				Create User
			</button>
			<button class="flex items-center gap-1 hover:text-stone-400 transition-colors">
				<IconDatabasePlus />
				Create Database
			</button>
			<button
				class="flex items-center gap-1 text-lime-200/40 hover:text-lime-200/80 transition-colors"
			>
				<IconPlugConnected />
				Create Connection
			</button>
		</nav>
	</header>

	<slot />
</main>
