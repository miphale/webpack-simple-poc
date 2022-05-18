import handlebars  from 'handlebars';

var DateFormats = {
    input: "YYYY-MM-DD",
    date: "DD/MMM/YYYY",
    dateTime: "DD/MMM/YYYY HH:mm",
    dateTimeInput: "yyyy-mm-dd HH:mm:ss",
    dateTimeDisplay: "YYYY-MM-DD HH:mm:ss"
};

handlebars.registerHelper("checkedIf", function (condition) {
    return (condition) ? "checked" : "";
});

handlebars.registerHelper("selectedIf", function (val) {
    return ("object" == typeof(val)) ? "selected" : "";
});

handlebars.registerHelper("selectedIfValues", function (val1, val2) {
  return (val1 === val2) ? "selected" : "";
});

// Deprecated since version 0.8.0 
handlebars.registerHelper("formatDate", function(datetime, format) {
    if (datetime!=null) {
        format = DateFormats[format] || format;
        return moment(new Date(datetime)).format(format);
    } else {
        return '';
    }
});

handlebars.registerHelper('for', function(from, to, incr, block) {
    var result = '';
    for(var i = from; i <= to; i += incr){
        result += block.fn(i);
    }
    return result;
});

/** Form validation */
export function clone (obj) {
    const copy = {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
    }
    return copy
  }
  
  export function defaults (obj, defaultObject) {
    obj = clone(obj || {})
    for (const k in defaultObject) {
      if (obj[k] === undefined) obj[k] = defaultObject[k]
    }
    return obj
  }
  
  export function insertAfter (refNode, nodeToInsert) {
    const sibling = refNode.nextSibling
    if (sibling) {
      const parent = refNode.parentNode
      parent.insertBefore(nodeToInsert, sibling)
    } else {
      parent.appendChild(nodeToInsert)
    }
  }
  
  export function insertBefore (refNode, nodeToInsert) {
    const parent = refNode.parentNode
    parent.insertBefore(nodeToInsert, refNode)
  }
  
  export function forEach (items, fn) {
    if (!items) return
    if (items.forEach) {
      items.forEach(fn)
    } else {
      for (let i = 0; i < items.length; i++) {
        fn(items[i], i, items)
      }
    }
  }
  
  export function debounce (ms, fn) {
    let timeout
    const debouncedFn = function () {
      clearTimeout(timeout)
      timeout = setTimeout(fn, ms)
    }
    return debouncedFn
  }

  // validForm
  
  export default function validForm (element, options) {
    if (!element || !element.nodeName) {
      throw new Error('First arg to validForm must be a form, input, select, or textarea')
    }
  
    let inputs
    const type = element.nodeName.toLowerCase()
  
    options = defaults(options, defaultOptions)
    if (type === 'form') {
      inputs = element.querySelectorAll('input, select, textarea')
      focusInvalidInput(element, inputs)
    } else if (type === 'input' || type === 'select' || type === 'textarea') {
      inputs = [element]
    } else {
      throw new Error('Only form, input, select, or textarea elements are supported')
    }
  
    validFormInputs(inputs, options)
  }
  
  function focusInvalidInput (form, inputs) {
    const focusFirst = debounce(100, () => {
      const invalidNode = form.querySelector(':invalid')
      if (invalidNode) invalidNode.focus()
    })
    forEach(inputs, (input) => input.addEventListener('invalid', focusFirst))
  }
  
  function validFormInputs (inputs, options) {
    const {invalidClass, customMessages} = options
    forEach(inputs, function (input) {
      toggleInvalidClass(input, invalidClass)
      handleCustomMessages(input, customMessages)
      handleCustomMessageDisplay(input, options)
    })
  }

   // toggleInvalidClass

export function toggleInvalidClass (input, invalidClass) {
    input.addEventListener('invalid', function () {
      input.classList.add(invalidClass)
    })
  
    input.addEventListener('input', function () {
      if (input.validity.valid) {
        input.classList.remove(invalidClass)
      }
    })
  }