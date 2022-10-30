function array_search(data, search, key = [], index = -1){
    var list_array = [];

    if(key.length > 0 && index > -1){
        var list_key = '';
        key.forEach(item => {
            if(Number.isInteger(item)){
                list_key += "["+item+"]";
            }else {
                list_key += "['"+item+"']";
            }
        })

        var list = eval("data["+index+"]"+list_key);
        if(typeof list == "string" && typeof search == "string"){
            if(list.search(search) >= 0){
                list_array.push(data[index]);
            }
        }else if(typeof list == "object") {
            if(Array.isArray(list)){
                for(var i = 0; i < list.length; i++){
                    var add_key = key;
                    add_key.push(i);

                    var found = array_search(data, search, add_key, index);

                    if(found.length > 0){
                        list_array.push(found[0]);
                        break;
                    }else {
                        add_key.pop(); 
                    }
                }
            }else {
                var key_list = Object.keys(list);

                for(var i = 0; i < key_list.length; i++){
                    var add_key = key;
                    add_key.push(key_list[i]);

                    var found = array_search(data, search, add_key, index);

                    if(found.length > 0){
                        list_array.push(found[0]);
                        break;
                    }else {
                        add_key.pop();
                    }
                }
            }
        }else {
            if(list == search){
                list_array.push(data[index]);
            }
        }
    }else if(key.length > 0 && index == -1){
        for(var i = 0; i < data.length; i++){
            var found = array_search(data, search, key, i);
            if(found.length > 0){
                list_array.push(found[0]);
            }
        }
    }else {
        for(var i = 0; i < data.length; i++){
            var key = [];
            if(Array.isArray(data[i])){
                for(var j = 0; j < data[i].length; i++){
                    var found = array_search(data, search, [j], i);
                    if(found.length > 0){
                        list_array.push(found[0]);
                        break;
                    }
                }
            }else {
                var key = Object.keys(data[i]);
                for(var j = 0; j < key.length; j++){
                    var found = array_search(data, search, [key[j]], i);
                    if(found.length > 0){
                        list_array.push(found[0]);
                        break;
                    }
                }
            }
        }
    }
    return list_array;
}