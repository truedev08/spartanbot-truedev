export function selectBestCombination(original_array, target_value, object_value_function) {
	if (!object_value_function)
		object_value_function = function(obj){ return obj }

	var best_match = []

	var total_up_array = function(my_array){
		var total = 0;

		for (var obj of my_array){
			total += parseFloat(object_value_function(obj))
		}

		return total
	}

	var stop_for_loop = false
	var recurse_combos = function(array_prefix, array_to_use) {
		for (var i = 0; i < array_to_use.length; i++) {
			if (stop_for_loop)
				break;

			// copy the array
			var result_arr = array_prefix.slice(0, array_prefix.length)
			result_arr.push(array_to_use[i])

			if (total_up_array(result_arr) > total_up_array(best_match) && total_up_array(result_arr) <= target_value)
				best_match = result_arr

			if (total_up_array(best_match) === target_value)
				stop_for_loop = true
			
			recurse_combos(result_arr, array_to_use.slice(i + 1));
		}
	}

	recurse_combos([], original_array);

	return best_match;
}
const fixedLength = 6;

export const toNiceHashPrice = (amount, hash, time) => {
	return Number(((amount / hash / time) * 24).toFixed(fixedLength))
}
export const toMRRAmount = (price, time, hash) => {
	return Number((((price/24)*time)*hash).toFixed(fixedLength))
}
export const getLimit = (price, amount, time) => {
	return Number(((amount/(price/24))/time).toFixed(fixedLength))
}

export const getDuration = (price, hash, amount) => {
	return Number(((amount/hash)/(price/24)).toFixed(fixedLength))
}

export const getEstAmountSpent = (price, hash, time) => {
	return Number((((price*hash)/24)*time).toFixed(fixedLength))
}

export const serializePool = (pool, type) => {
	let serPool = {}
	if (type === "MiningRigRentals") {
		for (let opt in pool) {
			if (opt === 'algo') {
				serPool.type = pool[opt]
			} else if (opt === 'pool_host') {
				serPool.host = pool[opt]
			} else if (opt === 'pool_port') {
				serPool.port = pool[opt]
			} else if (opt === 'pool_user') {
				serPool.user = pool[opt]
			} else if (opt === 'pool_pass') {
				serPool.pass = pool[opt]
			} else {
				serPool[opt] = pool[opt]
			}
		}
	}
	if (type === "NiceHash") {
		for (let opt in pool) {
			if (opt === 'type') {
				serPool.algo = pool[opt]
			} else if (opt === 'host') {
				serPool.pool_host = pool[opt]
			} else if (opt === 'port') {
				serPool.pool_port = pool[opt]
			} else if (opt === 'user') {
				serPool.pool_user = pool[opt]
			} else if (opt === 'pass') {
				serPool.pool_pass = pool[opt]
			} else {
				serPool[opt] = pool[opt]
			}
		}
	}

	return serPool
}