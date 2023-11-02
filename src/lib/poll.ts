import { onMount } from 'svelte';

export function poll<T>(fn: () => Promise<T> | T, ms: number) {
	onMount(() => {
		const interval = setInterval(fn, ms);
		fn();

		return () => clearInterval(interval);
	});
}
