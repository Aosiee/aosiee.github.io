<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	export let showSelector = false;
	export let separateCategories = false;
	export let showPlatforms = false;

	let isotope: any = null;
	let activeFilter: string | null = null;

	type IconData = {
		name: string;
		icon: string;
		viewbox: string;
	};

	function isPlatformName(inputName: string) {
		return platformIcons.some(
			(platform: { name: string }) => platform.name.toLowerCase() === inputName.toLowerCase()
		);
	}

	function getPlatformIcon(platformName: string) {
		const platform = platformIcons.find((p) => p.name.toLowerCase() === platformName.toLowerCase());
		if (platform) {
			return platform;
		} else {
			console.warn('Failed to getPlatformIcon');
			return undefined;
		}
	}

	function removeSpaces(str: string) {
		return str.replace(/\s+/g, '-').toLowerCase();
	}

	let platformIcons: IconData[] = [
		{
			name: 'nintendo',
			icon: 'M16.487 13.558a6.191 6.191 0 106.216 6.3 6.1 6.1 0 00-6.216-6.3zM30.843.009q-6.757.007-13.51 0a16.51 16.51 0 00-7.306 1.51c-6.227 3-9.766 8-9.9 14.9C-.082 27.427.061 38.442.085 49.453a15.279 15.279 0 00.367 2.991 16.274 16.274 0 004.812 8.666 16.892 16.892 0 0012.045 4.708h13.576c.83 0 .916-.084.916-.916V1c.005-.959-.027-.991-.958-.991zm-4.409 60.439c-.207.016-.387.036-.567.036-2.873 0-5.743.012-8.616 0a11.528 11.528 0 01-8.107-3.064 10.984 10.984 0 01-3.723-8.192c-.052-10.844-.023-21.689-.02-32.53a11.556 11.556 0 019.254-11.094 16.466 16.466 0 012.759-.249c2.767-.031 5.535-.012 8.3-.012h.718v55.105zm39.436-43.1a20.59 20.59 0 00-.354-3.735A16.8 16.8 0 0049.24.022c-3.3-.052-6.607-.011-9.912-.011-.938 0-.951.014-.951.926v63.757c0 1.118 0 1.118 1.09 1.118 3.183 0 6.362.016 9.545-.008a16.91 16.91 0 0016.872-17.045q.006-15.699-.014-31.408zM50.988 42.804a6.618 6.618 0 01.478-13.223 6.618 6.618 0 11-.478 13.226z',
			viewbox: '0 0 65 65'
		},
		{
			name: 'playstation',
			icon: 'M80.22 62.795a.232.232 0 01-.109-.159c0-.054-.019-.149-.027-.272l-.022-.453a.83.83 0 00-.123-.477.669.669 0 00-.21-.17 1 1 0 00.267-.262.949.949 0 00.147-.542.883.883 0 00-.527-.871 1.565 1.565 0 00-.675-.121h-1.653v3.544h.618v-1.451h.967a1.122 1.122 0 01.383.054.4.4 0 01.195.385l.032.565c.011.131.017.226.026.277a.46.46 0 00.042.134l.025.041h.689v-.2zm-.861-1.88a.864.864 0 01-.468.11h-.982v-1h1.044a.85.85 0 01.345.061.421.421 0 01.214.422.46.46 0 01-.153.404zm1.549-1.86a3.2 3.2 0 10.928 2.256 3.165 3.165 0 00-.928-2.256zm-2.258 4.911a2.655 2.655 0 112.645-2.661 2.651 2.651 0 01-2.645 2.661zm-64.9-11.744a14.871 14.871 0 008.168-.418l6.748-2.454v7.093c-.431.074-.9.156-1.338.223a44.267 44.267 0 01-21.033-1.695c-6.6-1.855-7.71-5.728-4.7-7.961a32.171 32.171 0 017.515-3.611l19.552-6.949v7.917l-14.069 5.038c-2.487.893-2.86 2.16-.842 2.817zm69.241-2.763c-1.641 2.059-5.642 3.539-5.642 3.539L47.54 63.705v-7.9l21.934-7.824c2.491-.889 2.877-2.148.852-2.81a14.868 14.868 0 00-8.165.416L47.54 50.739v-8.188l.835-.286a50.614 50.614 0 0110.161-2.16 43.507 43.507 0 0118.927 2.256c6.438 2.037 7.159 5.032 5.525 7.098zM50.372 36.017V15.823c0-2.365-.431-4.543-2.663-5.161-1.7-.554-2.753 1.034-2.753 3.4v50.56L31.31 60.289V.012a164.376 164.376 0 0118.8 5.145c11.544 3.97 15.461 8.905 15.461 20.02 0 10.835-6.691 14.947-15.198 10.84z',
			viewbox: '0 0 83.75 64.624'
		},
		{
			name: 'xbox',
			icon: 'M24.002 18.362a.171.171 0 00.05-.1.152.152 0 00-.064-.109C12.793 7.009 9.801 9.561 9.847 9.526a33.048 33.048 0 00-3.078 43.547.148.148 0 00.178.061.14.14 0 00.038-.173C4.461 45.17 17.346 26.277 24.002 18.362zm32.3-8.833s-.007-.01-.032-.031l.028.031c.04.035-2.928-2.533-14.129 8.613a.154.154 0 00-.059.113.166.166 0 00.048.095c6.654 7.919 19.524 26.824 17.006 34.616a.136.136 0 00.038.173.148.148 0 00.177-.061 33.05 33.05 0 00-3.081-43.551zm-40.4-4.445c5.665-1.451 14.66 3.261 17.1 4.663a.141.141 0 00.074.027.11.11 0 00.066-.027c.922-.553 10.652-6.084 17.046-4.7a.13.13 0 00.161-.058.127.127 0 00-.052-.164 33.076 33.076 0 00-34.494.031.132.132 0 00-.058.166.131.131 0 00.157.06zm38.936 52.845l-.009.008a.011.011 0 01.009-.008zM33.174 26.554a.182.182 0 00-.1-.049.232.232 0 00-.116.049c-9.882 7.525-26.81 26.127-21.653 31.383a33.053 33.053 0 0043.522 0c5.177-5.256-11.757-23.858-21.651-31.383z',
			viewbox: '0 0 66.126 66.124'
		},
		{
			name: 'steam',
			icon: 'M32.318-.009a32.547 32.547 0 00-32.319 30.1l17.383 7.248a9.065 9.065 0 015.167-1.607c.172 0 .342 0 .512.014l7.729-11.307v-.158a12.231 12.231 0 1112.23 12.345h-.278l-11.026 7.935q.012.217.012.438a9.175 9.175 0 01-18.182 1.83L1.115 41.637A32.475 32.475 0 1032.318-.009zm-11.994 49.66l-3.983-1.665a6.854 6.854 0 0012.554-.338 6.95 6.95 0 00.012-5.316 6.853 6.853 0 00-8.8-3.854l4.116 1.726a5.125 5.125 0 012.73 6.691 5.061 5.061 0 01-6.629 2.756zm30.845-25.369a8.15 8.15 0 10-8.149 8.221 8.2 8.2 0 008.149-8.221zm-14.255-.014a6.121 6.121 0 116.118 6.174 6.146 6.146 0 01-6.118-6.174z',
			viewbox: '0 0 64.75 65.438'
		},
		{
			name: 'epic',
			icon: 'M19.718 17.016a.908.908 0 00.7-1c.009-1.767.015-3.536 0-5.3a.92.92 0 00-.689-.994 11.593 11.593 0 00-1.677-.028c0 2.456-.009 4.915 0 7.371.554-.018 1.113.021 1.666-.049zm-3.289 14.591a15.147 15.147 0 00-.7 1.724h1.378c-.22-.576-.455-1.15-.678-1.724zM43.77 45.161a1688.301 1688.301 0 01-8.546 3.584c-3.388 1.42-6.892 2.884-10.327 4.346a5.2 5.2 0 01-2.343.577 4.4 4.4 0 01-1.6-.294l-.018-.007-.014-.008a4901.117 4901.117 0 00-10.774-4.523c-2.809-1.175-5.718-2.391-8.573-3.593a4.8 4.8 0 01-1.578-.993c.015 7.022 0 14.039.013 21.067a3.732 3.732 0 001.2 2.887 4.964 4.964 0 002.891.68q18.639-.008 37.275 0a3.68 3.68 0 003.193-1.307 5.042 5.042 0 00.588-2.616V44.279a4.265 4.265 0 01-1.387.882zm-32.455 17.38a3.28 3.28 0 01-3.138-.77 2.787 2.787 0 01-.554-1.434c.539 0 1.076-.011 1.615-.013a1.355 1.355 0 001.857.688.4.4 0 00.016-.738c-.982-.549-2.361-.51-3.03-1.543a2.026 2.026 0 011.245-2.9 3.221 3.221 0 012.983.528 2.312 2.312 0 01.652 1.606c-.538.01-1.076.01-1.612-.007a1.086 1.086 0 00-1.944-.285c.469.733 1.45.724 2.169 1.078a1.785 1.785 0 011.408 1.837 1.956 1.956 0 01-1.667 1.953zm7.574-5.28c-.592 0-1.182 0-1.776-.009-.006 1.745.007 3.494 0 5.244-.549-.009-1.1-.009-1.643-.009-.006-1.749.019-3.494-.017-5.242-.593.007-1.188.011-1.782.007 0-.478.006-.956.009-1.432 1.744.018 3.486-.035 5.227.034-.011.466-.016.933-.018 1.407zm4.953 5.063a3.571 3.571 0 01-3.178-.124 2.227 2.227 0 01-1.008-1.977c.019-.849-.038-1.7.035-2.549a2.223 2.223 0 011.755-1.889 3.279 3.279 0 013.075.734c.8.93.483 2.229.547 3.344a2.427 2.427 0 01-1.226 2.461zm6.3.142c-.411-.82-.91-1.591-1.335-2.406h-.675c.006.811.006 1.617.006 2.427-.548 0-1.095 0-1.643-.013 0-2.218-.014-4.435.015-6.652 1.08.007 2.163-.047 3.243.026a1.858 1.858 0 011.642 1.106 2.493 2.493 0 01-.841 2.937c.422.856 1.18 1.6 1.25 2.583-.552.017-1.104.017-1.66-.008zm7.352.017c-1.488.013-2.973.017-4.462 0 .022-2.223-.011-4.44.013-6.663 1.48 0 2.963-.017 4.44.018q-.01.709-.01 1.423c-.94-.009-1.874-.014-2.807 0 0 .407 0 .814.01 1.224.788-.015 1.579-.019 2.364-.015.006.437.015.87.029 1.308-.8.064-1.608.038-2.416.034-.009.414-.015.827-.009 1.239.955 0 1.9.007 2.858 0-.009.48-.015.96-.008 1.432zm-15.5-5.256a.923.923 0 00-.707.988 16.913 16.913 0 00.064 2.36 1.149 1.149 0 002.052-.161c.029-.855.034-1.713-.01-2.568a1.108 1.108 0 00-1.402-.615zm6.143.046c.006.476 0 .95-.013 1.422a3.491 3.491 0 001.732-.212 4.862 4.862 0 00-.04-1.051 3.7 3.7 0 00-1.682-.159zM2.051 44.062c6.452 2.714 12.918 5.4 19.365 8.123a3.177 3.177 0 001.141.207 3.984 3.984 0 001.807-.456c6.3-2.678 12.625-5.286 18.929-7.955a2.943 2.943 0 001.794-2c.14-2.285.041-4.579.071-6.864V3.823a3.947 3.947 0 00-1-2.956 4.405 4.405 0 00-2.939-.848H4.078a4.662 4.662 0 00-3.015.794A3.981 3.981 0 00-.001 3.83v36.565A10.591 10.591 0 00.12 42.14a3.111 3.111 0 001.928 1.922zm11.024-8.322c.889-2.028 1.718-4.08 2.6-6.111H17.2c.82 2.045 1.735 4.051 2.544 6.1-.566 0-1.13 0-1.7.013-.145-.378-.295-.751-.442-1.126a57.068 57.068 0 00-1.171-.013c-.411 0-.819 0-1.228.013a6.211 6.211 0 01-.469 1.107c-.215.012-.43.019-.647.019-.275 0-.554-.009-.83-.009zm9.365 12.408c-2.88-.907-5.723-1.945-8.581-2.918q4.473-.022 8.946-.026 4.23 0 8.459.03-4.401 1.497-8.827 2.914zm15.058-12.569a3.71 3.71 0 01-1.413.27 4.37 4.37 0 01-2.725-.974c.3-.375.6-.74.915-1.1a3.308 3.308 0 001.875.711 2.24 2.24 0 00.522-.065l.349-.409c-.661-.793-1.853-.551-2.654-1.124a1.767 1.767 0 01.185-2.97 3.053 3.053 0 011.44-.344 4.324 4.324 0 012.406.786c-.281.388-.554.779-.825 1.171a3.135 3.135 0 00-1.6-.578 1.678 1.678 0 00-.4.045.411.411 0 00-.225.646c.882.467 2.008.394 2.758 1.11a1.792 1.792 0 01-.611 2.825zM29.685 9.285a2.9 2.9 0 011.573-2.105 5.3 5.3 0 012.289-.38c.288 0 .577.006.867.006h.421a3.736 3.736 0 012.687.9 3.636 3.636 0 01.922 2.662c0 1.418-.008 2.834 0 4.25-.549 0-1.106.007-1.659.007-.45 0-.9 0-1.351-.02.021-1.351.021-2.7.008-4.049a.961.961 0 00-.807-1.015 9.162 9.162 0 00-.642-.028 2.989 2.989 0 00-.82.1 1.146 1.146 0 00-.552 1.128c0 4.249-.008 8.5.007 12.746a.96.96 0 00.774 1.012 6.67 6.67 0 00.711.042 3.927 3.927 0 00.716-.061.972.972 0 00.669-1.01c.008-1.541.017-3.085-.006-4.625.538-.01 1.078-.016 1.617-.016.471 0 .944 0 1.416.018-.018 1.607.009 3.211-.011 4.816a3.522 3.522 0 01-1.38 3.027 4.546 4.546 0 01-2.557.56c-.306 0-.609-.007-.905-.007H33.23a3.6 3.6 0 01-2.893-1.1 4.64 4.64 0 01-.79-3.025V12.739a20.2 20.2 0 01.135-3.454zm-1.694 20.408h2.382c.8 0 1.6 0 2.395-.007 0 .457 0 .914.008 1.372h-1.325q-.936 0-1.869-.008c0 .331 0 .664.009 1H32.443v1.29c-.435.009-.867.011-1.305.011h-1.56v.988c.635 0 1.264.006 1.9.006.44 0 .877 0 1.315-.012.007.467.016.936.024 1.4H29.709c-.567 0-1.138 0-1.7.013-.045-2.015-.017-4.034-.021-6.053zm-3.1-22.726h1.872c.4 0 .807 0 1.215.011-.03 6.694.01 13.389-.02 20.079-1.022-.008-2.047 0-3.072-.007.02-6.691-.003-13.386.003-20.083zm.171 22.73h1.706c-.022 2.019.013 4.041-.022 6.06a86.124 86.124 0 00-1.245-.011h-.338c-.015-1.183.015-2.363-.021-3.543a97.436 97.436 0 01-1.57 2.412c-.526-.781-.992-1.6-1.553-2.355-.012 1.162 0 2.323-.008 3.484h-.575c-.342 0-.685 0-1.026-.008 0-2.007.014-4.011-.007-6.02h.015c.344 0 .7-.037 1.047-.037a2.869 2.869 0 01.7.075c.5.749.953 1.524 1.413 2.295.522-.76.976-1.575 1.482-2.352zM14.995 6.967c.525.006 1.047.006 1.571.006h1.909c.525 0 1.046 0 1.568.006a3.544 3.544 0 012.629 1.015 3.927 3.927 0 01.834 2.736c-.009 1.88.008 3.759-.009 5.64a3.288 3.288 0 01-1.427 2.885 4.848 4.848 0 01-2.526.528c-.408 0-.819-.014-1.22-.014h-.273v7.291h-3.064c-.001-6.701-.019-13.398.006-20.093zm-8.311 0q1.648.014 3.3.014 1.734 0 3.472-.011-.006 1.387 0 2.777H9.712c-.025 1.894.022 3.787.036 5.681h3.561c.01.933 0 1.871 0 2.8-.6.008-1.187.01-1.78.01H9.753c-.117 2.021.01 4.054-.07 6.079.5-.032 1.007-.041 1.513-.041.478 0 .952.007 1.43.007.293 0 .585 0 .881-.01q-.039 1.385 0 2.773H6.676q.019-10.038.006-20.076zm1.015 23.368a3.374 3.374 0 012.2-.777 3.589 3.589 0 012.319.823 4.91 4.91 0 01-.873 1.2 2.589 2.589 0 00-1.483-.584 1.418 1.418 0 00-.651.154 1.812 1.812 0 00-.194 3.045 1.734 1.734 0 00.934.258 2.08 2.08 0 00.915-.212 2.055 2.055 0 00.078-.823c-.4 0-.8.007-1.192.009v-1.209c.913 0 1.826 0 2.738.008 0 .9.005 1.8 0 2.7a4.234 4.234 0 01-2.59.936 3.672 3.672 0 01-.815-.094 3.008 3.008 0 01-2.344-2.146 3.144 3.144 0 01.956-3.285z',
			viewbox: '0 0 45 68'
		},
		{
			name: 'kickstarter',
			icon: 'M400 480H48c-26.4 0-48-21.6-48-48V80c0-26.4 21.6-48 48-48h352c26.4 0 48 21.6 48 48v352c0 26.4-21.6 48-48 48zM199.6 178.5c0-30.7-17.6-45.1-39.7-45.1-25.8 0-40 19.8-40 44.5v154.8c0 25.8 13.7 45.6 40.5 45.6 21.5 0 39.2-14 39.2-45.6v-41.8l60.6 75.7c12.3 14.9 39 16.8 55.8 0 14.6-15.1 14.8-36.8 4-50.4l-49.1-62.8 40.5-58.7c9.4-13.5 9.5-34.5-5.6-49.1-16.4-15.9-44.6-17.3-61.4 7l-44.8 64.7v-38.8z',
			viewbox: '0 0 448 512'
		},
		{
			name: 'indiegogo',
			icon: 'M78 341.5h232.2v-29.2h-14.6v14.6H92.6V123.8h203v119.2h14.6V109.2H78v232.3zM129.1 250.3h14.6v54.8h-14.6v-54.8zM181.2 275.5l-15-25.2h-15.2v54.7h13.9v-28.5h.3l16.6 28.5h13.6v-54.7h-13.9v25.2zM202.7 250.3v54.7h18.6c17.3 0 25.6-4.3 25.6-27.5 0-22.6-8.3-27.2-25.9-27.2h-18.3zm29.2 27.5c0 13.9-4 14.6-9.3 14.6h-5v-28.9h4.6c8.6 0 13.6.4 13.6 14.3zM251.8 250.3h14.6v54.7h-14.6v-54.7zM387.6 249.6c-20.6 0-23.9 13.3-23.9 28.2 0 14.6 3.7 27.9 23.9 27.9 20.2 0 23.9-13.3 23.9-27.9 0-14.9-3.3-28.2-23.9-28.2zm0 43.1c-8 0-9.3-5.6-9.3-14.6s1-14.6 9.3-14.6c8 0 9 5.6 9 14.6 0 9-1.4 14.6-9 14.6zM490.4 249.6c-20.6 0-23.9 13.3-23.9 28.2 0 14.6 3.7 27.9 23.9 27.9 20.2 0 23.9-13.3 23.9-27.9 0-14.9-3.3-28.2-23.9-28.2zm0 43.1c-8 0-9.3-5.6-9.3-14.6s1-14.6 9.3-14.6c8 0 9 5.6 9 14.6 0 9-1 14.6-9 14.6zM519 296.4c-2.7 0-3.3 1.7-3.3 4.3 0 2.3.7 4 3.3 4s3.3-1.7 3.3-4c0-2.6-.6-4.3-3.3-4.3zm0 7.6c-2.3 0-2.7-1.7-2.7-3.7 0-2 .7-3.7 2.7-3.7 2.3 0 2.7 1.7 2.7 3.7 0 2-1 3.7-2.7 3.7zM521 299.7c0-1-.3-1.7-1.7-1.7h-2v5h1v-1.7h.7l.7 1.7h1l-1-2c.4-.4.7-1 .7-1.7zm-1.7.7h-1v-1.7h1c.3 0 .7.3.7.7s-.4 1-.7 1zM335.5 283.8h9.3v1c0 6 .3 8.6-7 8.6-6.6 0-9-3-9-15.6 0-12.9 4-14.3 9.6-14.3 4.3 0 7.3 1 10 2.7l8-12.3c-4-2.7-10.3-4.3-16.9-4.3-18.9 0-24.9 9-24.9 28.2 0 16.6 4.3 27.9 22.6 27.9 3.3 0 6-.3 8.3-.7h13.6v-33.2h-21.2l-2.1 14.7zM438.3 283.8h9.3v1c0 6 .3 8.6-7 8.6-6.6 0-9-3-9-15.6 0-12.9 4-14.3 9.6-14.3 4.3 0 7.3 1 10 2.7l8-12.3c-4-2.7-10.3-4.3-16.9-4.3-18.9 0-24.9 9-24.9 28.2 0 16.6 4.3 27.9 22.6 27.9 3.3 0 6-.3 8.3-.7h13.6v-33.2h-21.2l-2.1 14.7zM310.2 263.5v-13.2h-36.1v54.7h36.1v-12.9h-21.9v-8.3h14.3l2-13h-16.3v-7.3h21.9z',
			viewbox: '0 0 600 400'
		}
	];

	type PlatformToLinkMap = {
		platform: string;
		link: string;
	};

	type GridItemData = {
		title: string;
		page: string;
		src: string;
		logo: string;
		platforms: PlatformToLinkMap[]; // Ensure platforms is always an array of strings
	};

	let professionalItems: GridItemData[] = [
		{
			title: 'Kinshft',
			page: '/projects',
			src: '/assets/images/headers/Kinshift_NoLogo_2.jpg',
			logo: '/assets/images/headers/Kinshift_Logo.png',
			platforms: [
				{
					platform: 'steam',
					link: 'https://store.steampowered.com/app/3370960/KINSHFT/'
				},
				{
					platform: 'kickstarter',
					link: 'https://www.kickstarter.com/projects/gabrielfrizzera/kinshft'
				},
				{
					platform: 'indiegogo',
					link: 'https://www.indiegogo.com/projects/kinshft-a-time-bending-adventure#/'
				}
			]
		},
		{
			title: 'Unannounced Project',
			page: '/projects',
			src: '/assets/images/headers/UnannouncedProject.png',
			logo: '',
			platforms: []
		},
		{
			title: 'The Chant DLC',
			page: '/projects',
			src: '/assets/images/headers/TheChantDLCHeader-NoLogo.jpg',
			logo: '/assets/images/headers/TheChantDLCHeader_Logo.png',
			platforms: [
				{
					platform: 'steam',
					link: 'https://store.steampowered.com/app/2190430/The_Chant__The_Gloom_Below/'
				},
				{
					platform: 'playstation',
					link: 'https://store.playstation.com/en-us/product/UP6714-PPSA03619_00-THEGLOOMBELOW000'
				},
				{
					platform: 'xbox',
					link: 'https://www.xbox.com/en-CA/games/store/the-chant-the-gloom-below/9NRBKCHLNKX6/0010'
				}
			]
		},
		{
			title: 'The Chant',
			page: '/projects',
			src: '/assets/images/headers/TheChantHeader_NoLogo.jpg',
			logo: '/assets/images/headers/TheChantHeader_Logo.png',
			platforms: [
				{
					platform: 'steam',
					link: 'https://store.steampowered.com/app/1577250/The_Chant/'
				},
				{
					platform: 'playstation',
					link: 'https://store.playstation.com/en-us/concept/10002823'
				},
				{
					platform: 'xbox',
					link: 'https://www.xbox.com/en-CA/games/store/the-chant/9NX008DVW20T'
				}
			]
		},
		{
			title: 'Shift - VFS Final Project',
			page: '/projects',
			src: '/assets/images/headers/ShiftHeader.jpg',
			logo: '',
			platforms: []
		}
	];

	let codingItems: GridItemData[] = [
		{
			title: 'Procedural Voxel Generation',
			page: '/projects',
			src: '/assets/images/headers/voxel-generation_header-2.jpg',
			logo: '',
			platforms: []
		},
		{
			title: 'Multithreaded A.I Navigation',
			page: '/projects',
			src: '/assets/images/headers/AIOverviewHeader.jpg',
			logo: '',
			platforms: []
		}
	];

	let gameJamItems: GridItemData[] = [
		{
			title: 'Poppet',
			page: '/projects',
			src: '/assets/images/headers/Poppet_Header.jpg',
			logo: '/assets/images/headers/Poppet.png',
			platforms: []
		},
		{
			title: 'Get A Grip',
			page: '/projects',
			src: '/assets/images/headers/GAG_Header2.png',
			logo: '/assets/images/headers/GAG_Logo.png',
			platforms: []
		}
	];

	let gridCategories = [
		{
			data: professionalItems,
			categoryClass: 'professional-project',
			categoryClassRaw: '.professional-project',
			categoryTitle: 'Professional Projects'
		},
		{
			data: codingItems,
			categoryClass: 'coding-adventure',
			categoryClassRaw: '.coding-adventure',
			categoryTitle: 'Coding Adventures'
		},
		{
			data: gameJamItems,
			categoryClass: 'game-jam',
			categoryClassRaw: '.game-jam',
			categoryTitle: 'Game Jams'
		}
	];

	onMount(() => {
		isotope = new window.Isotope('.grid', {
			itemSelector: '.grid-item',
			layoutMode: 'fitRows'
		});
	});

	function filterItems(filter: string | null) {
		if (isotope) {
			activeFilter = filter;
			isotope.arrange({ filter: filter ? filter : '*' });
		}
	}

	function toggleFilter(filter: string) {
		// If the same button is clicked, reset the filter (show all)
		if (activeFilter === filter) {
			filterItems(null);
		} else {
			filterItems(filter);
		}
	}
</script>

<div class="container" style="z-index: 11;">
	{#if showSelector}
		<!-- Filter Buttons -->
		<div class="button-group row grid-item">
			{#each gridCategories as category}
				<div class="button-container col-4">
					<button
						class="category-button btn btn-success {activeFilter === category.categoryClassRaw
							? 'active'
							: ''}"
						on:click={() => toggleFilter(category.categoryClassRaw)}
					>
						<svg viewBox="0 0 107 62" preserveAspectRatio="none" class="button-border">
							<path
								fill="transparent"
								stroke="currentColor"
								stroke-width="3"
								d="M90.827 5.851s-40.2-5.078-67.581-.337c0 0-16.345-.086-17.956 11.359-2.133 11.445-.149 24.599 3.059 31.072 3.208 6.474 6.292 9.233 12.195 9.776 5.902.543 61.557.688 67.676-.358 6.119-1.045 12.025-7.464 13.017-17.064.992-9.6 7.743-30.336-10.41-34.448Z"
							></path>
						</svg>
						<h5>
							{category.categoryTitle}
						</h5>
					</button>
				</div>
			{/each}
		</div>

		<hr />
	{/if}

	<!-- Grid Layout -->
	<div class="w-100 overflow-x-hidden">
		<div class="row grid gx-5 overflow-hidden">
			{#each gridCategories as category, index}
				{#if category}
					{#if separateCategories}
						<div class="col-12 grid-item grid-title {category.categoryClass}">
							<h1>{category.categoryTitle}</h1>
						</div>

						<div class="col-12 grid-item grid-title">
							<!-- <div style="height: 25px;"></div> -->
							<hr class="grid-hr">
							<div style="height: 30px;"></div>
						</div>
					{/if}

					{#each category.data as item}
						<div class="col-sm-12 col-md-6 col-lg-4 card grid-item {category.categoryClass}">
							<!-- <div class="card"> -->
							<div class="card-body">
								<a
									class="card-logo-link"
									href={base + '/projects/' + category.categoryClass + '/' + removeSpaces(item.title)}
									data-sveltekit-noscroll
								>
									{#if item.logo}
										<div class="card-logo">
											<img src={item.logo} alt={item.title + ' Logo'} class="h-100" />
										</div>
									{/if}

									<div class="card-image">
										<img src={item.src} class="w-100 h-100" alt={item.title} loading="lazy" />
									</div>
								</a>
								<div class="card-text-block">
									<a
										class="card-text-link"
										href={base + '/projects/' + category.categoryClass + '/' + removeSpaces(item.title)}
										data-sveltekit-noscroll
									>
										<!-- <h2 class="card-text tight-text uppercase" style="font-size: 1.375rem">{item.title}</h2> -->
										<h2 class="card-text uppercase" style="font-size: 1.375rem">{item.title}</h2>
									</a>

									{#if showPlatforms}
										{#if Array.isArray(item.platforms) && item.platforms.length > 0}
											{#each item.platforms as platform}
												{#if isPlatformName(platform.platform)}
													<a class="platform-icon" href={platform.link} data-sveltekit-noscroll>
														<svg
															class="h-100"
															viewBox={getPlatformIcon(platform.platform)?.viewbox}
															fill="currentColor"
															preserveAspectRatio="xMidYMin"
														>
															<path d={getPlatformIcon(platform.platform)?.icon}> </path>
														</svg>
													</a>
												{/if}
											{/each}
										{/if}
									{/if}
								</div>
							</div>
							<!-- </div> -->
						</div>
					{/each}
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.card-text-block {
		height: 2rem;
		display: flex;
		margin-top: 0.5rem;
		color: var(--primary-theme);
	}

	.platform-icon {
		padding: 4px;
		width: auto;
		height: 100%;

		transition: 0.3s;
	}

	.platform-icon svg {
		width: 100%;
	}

	.card-body .platform-icon:hover {
		transform: scale(1.1);
		transition: 0.3s;
		color: var(--highlight-theme);
	}

	.button-group {
		margin-bottom: 1rem;
		justify-content: space-around;
	}
	.btn.active {
		background-color: black;
		color: white;
	}

	/* .grid-item {
		margin-bottom: 1rem;
	} */

	.button-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		height: 6rem;
		width: 18rem;
		/* overflow: hidden; */
	}

	.category-button {
		position: absolute;
		left: 0;
		z-index: 15;
		height: 100%;
		width: 100%;
		top: -2px;

		-webkit-clip-path: url(#btn-shape);
		clip-path: url(#btn-shape);

		color: var(--primary-theme);
	}

	.category-button:active {
		background-color: var(--primary-theme);
		color: var(--main-bg-colour);
	}

	.category-button h5 {
		margin: 1rem;
	}

	.button-border {
		position: absolute;
		width: 90%;
		height: 85%;
		top: 52%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.card-body:hover .card-logo-link .card-image img {
		transform: scale(1.05);
		transition-duration: 0.3s;
	}
	.card-body:hover .card-logo-link .card-logo img {
		transform: scale(0.95);
		transition-duration: 0.3s;
	}
	.card-body a .card-image img {
		transition-duration: 0.3s;
	}
	.card-body a .card-logo img {
		transition-duration: 0.3s;
	}

	.card-body {
		height: 100%;
		padding: 0 0 30px 0;

		padding-left: 1rem;
		padding-right: 1rem;
	}

	.card-body .card-logo-link .card-image img {
		object-fit: cover;
		object-position: center;

		-webkit-clip-path: url(#game-card-mask);
		clip-path: url(#game-card-mask);
	}

	.card-body .card-logo-link {
		display: flex;
		height: 93%;
		width: 100%;

		justify-content: center;
		align-items: center;
	}

	.card {
		/* max-height: 20rem; */
		height: 18rem;

		/* Disabling Bootstrap Defaults */
		border: 0;
		background-color: transparent;

		padding-bottom: 1rem;
	}

	.card-logo img {
		object-fit: contain !important;
		max-width: 65%;
	}

	.card-image {
		height: 100%;
		width: 100%;
	}

	.card-logo {
		max-height: 10rem;
		position: absolute;
		z-index: 1;

		justify-content: center;
		align-items: center;
		place-items: center;

		padding: 1.75rem;
		top: 50;
		left: 0;

		width: 100%;
		height: 100%;

		display: flex;
	}

	.card-text-link {
		text-decoration: none;
		width: 100%;
		height: 100%;
		align-content: center;
		color: var(--grey-theme);
	}

	.card-body:hover .card-text-link .card-text {
		color: var(--highlight-theme);
		transition: 0.3s;
	}

	.grid-title h1 {
		padding-top: 0.75rem;
	}

	.grid-hr {
		margin: 0;
	}
</style>
