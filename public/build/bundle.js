
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        const updates = [];
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        run_all(updates);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const ActiveTab = writable('dashboard');
    const checkDetail = writable(false);
    const Detail = writable();
    const isLocation = writable(false);
    const notifications = writable([]);
    const vehicles = writable([
        {
            id: 1,
            name: "ferocious z1",
            status: "insured",
            type: "auto",
            insuredAmount: 23,
            period: '10 months',
            crashes: 5,
            autoCost: 230,
            imgUrl: '../static/dodge.png'
        },
        {
            id: 2,
            name: "blaze BZ-500",
            status: "uninsured",
            type: "motorcycle",
            crashes: 6,
            autoCost: 200,
            costOfInsurance: 20,
            imgUrl: '../static/acura.png'
        },
        {
            id: 3,
            name: "ferocious z1",
            status: "insured",
            type: "auto",
            insuredAmount: 0,
            period: '3 months',
            crashes: 2,
            autoCost: 145,
            imgUrl: '../static/chevrolet.png'
        },
    ]);
    const destroyedVehicles =  writable([
        {
            id: 1,
            name: "ferocious z1",
            status: "insured",
            type: "auto",
            insuredAmount: 0,
            period: '',
            crashes: 0,
            autoCost: 0,
            destroyed: true,
            imgUrl: '../static/dodge.png'
        },
        {
            id: 2,
            name: "blaze BZ-500",
            status: "uninsured",
            type: "motorcycle",
            crashes: 0,
            autoCost: 0,
            destroyed: true,
            costOfInsurance: 20,
            imgUrl: '../static/acura.png'
        },
    ]);

    /* src\components\Header.svelte generated by Svelte v3.59.2 */
    const file$c = "src\\components\\Header.svelte";

    function create_fragment$c(ctx) {
    	let header;
    	let div;
    	let h4;
    	let t;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div = element("div");
    			h4 = element("h4");
    			t = text(/*$ActiveTab*/ ctx[0]);
    			attr_dev(h4, "class", "svelte-uucxgk");
    			add_location(h4, file$c, 7, 8, 130);
    			attr_dev(div, "class", "header-content svelte-uucxgk");
    			add_location(div, file$c, 6, 4, 92);
    			attr_dev(header, "class", "svelte-uucxgk");
    			add_location(header, file$c, 5, 0, 78);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div);
    			append_dev(div, h4);
    			append_dev(h4, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$ActiveTab*/ 1) set_data_dev(t, /*$ActiveTab*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $ActiveTab;
    	validate_store(ActiveTab, 'ActiveTab');
    	component_subscribe($$self, ActiveTab, $$value => $$invalidate(0, $ActiveTab = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ ActiveTab, $ActiveTab });
    	return [$ActiveTab];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\components\Menu.svelte generated by Svelte v3.59.2 */
    const file$b = "src\\components\\Menu.svelte";

    // (28:12) {#if messages.length > 0}
    function create_if_block$3(ctx) {
    	let circle;

    	const block = {
    		c: function create() {
    			circle = svg_element("circle");
    			attr_dev(circle, "cx", "18");
    			attr_dev(circle, "cy", "5");
    			attr_dev(circle, "r", "3");
    			attr_dev(circle, "fill", "#FF7A70");
    			add_location(circle, file$b, 28, 12, 7082);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, circle, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(circle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(28:12) {#if messages.length > 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let section;
    	let div;
    	let svg0;
    	let path0;
    	let t0;
    	let svg1;
    	let path1;
    	let t1;
    	let svg2;
    	let path2;
    	let t2;
    	let svg3;
    	let path3;
    	let mounted;
    	let dispose;
    	let if_block = /*messages*/ ctx[0].length > 0 && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t1 = space();
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t2 = space();
    			svg3 = svg_element("svg");
    			path3 = svg_element("path");
    			if (if_block) if_block.c();
    			attr_dev(path0, "d", "M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z");
    			attr_dev(path0, "fill-opacity", "0.6");
    			attr_dev(path0, "class", "svelte-tr5c1l");
    			add_location(path0, file$b, 14, 12, 620);
    			attr_dev(svg0, "class", "links wallet svelte-tr5c1l");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "24");
    			attr_dev(svg0, "height", "24");
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "fill", "none");
    			toggle_class(svg0, "active", /*$ActiveTab*/ ctx[1] === 'dashboard');
    			add_location(svg0, file$b, 13, 8, 385);
    			attr_dev(path1, "d", "M4.22222 10.75L5.88889 5.6875H18.1111L19.7778 10.75M18.1111 16.375C17.6691 16.375 17.2452 16.1972 16.9326 15.8807C16.62 15.5643 16.4444 15.1351 16.4444 14.6875C16.4444 14.2399 16.62 13.8107 16.9326 13.4943C17.2452 13.1778 17.6691 13 18.1111 13C18.5531 13 18.9771 13.1778 19.2896 13.4943C19.6022 13.8107 19.7778 14.2399 19.7778 14.6875C19.7778 15.1351 19.6022 15.5643 19.2896 15.8807C18.9771 16.1972 18.5531 16.375 18.1111 16.375ZM5.88889 16.375C5.44686 16.375 5.02294 16.1972 4.71038 15.8807C4.39782 15.5643 4.22222 15.1351 4.22222 14.6875C4.22222 14.2399 4.39782 13.8107 4.71038 13.4943C5.02294 13.1778 5.44686 13 5.88889 13C6.33092 13 6.75484 13.1778 7.0674 13.4943C7.37996 13.8107 7.55556 14.2399 7.55556 14.6875C7.55556 15.1351 7.37996 15.5643 7.0674 15.8807C6.75484 16.1972 6.33092 16.375 5.88889 16.375ZM19.6889 5.125C19.4667 4.4725 18.8444 4 18.1111 4H5.88889C5.15556 4 4.53333 4.4725 4.31111 5.125L2 11.875V20.875C2 21.1734 2.11706 21.4595 2.32544 21.6705C2.53381 21.8815 2.81643 22 3.11111 22H4.22222C4.51691 22 4.79952 21.8815 5.0079 21.6705C5.21627 21.4595 5.33333 21.1734 5.33333 20.875V19.75H18.6667V20.875C18.6667 21.1734 18.7837 21.4595 18.9921 21.6705C19.2005 21.8815 19.4831 22 19.7778 22H20.8889C21.1836 22 21.4662 21.8815 21.6746 21.6705C21.8829 21.4595 22 21.1734 22 20.875V11.875L19.6889 5.125Z");
    			attr_dev(path1, "fill-opacity", "0.6");
    			attr_dev(path1, "class", "svelte-tr5c1l");
    			add_location(path1, file$b, 18, 12, 1345);
    			attr_dev(svg1, "class", "links friends svelte-tr5c1l");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "24");
    			attr_dev(svg1, "height", "24");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "fill", "none");
    			toggle_class(svg1, "active", /*$ActiveTab*/ ctx[1] === 'your vehicles');
    			add_location(svg1, file$b, 17, 8, 1101);
    			attr_dev(path2, "d", "M1.69576 17.5098C1.77214 17.8416 1.93441 18.1474 2.1663 18.3966C2.3982 18.6459 2.69156 18.8298 3.01696 18.9299L3.21497 19.8H3.19847V22H20.7998V19.8H6.15C6.16444 19.6983 6.16184 19.595 6.1423 19.4942L5.92668 18.5449L17.3203 15.9533L17.5359 16.9026C17.5933 17.1545 17.7484 17.3732 17.9671 17.5108C18.1857 17.6483 18.45 17.6935 18.702 17.6363L19.6513 17.4196C19.7761 17.3913 19.8941 17.3387 19.9985 17.2647C20.103 17.1908 20.1918 17.097 20.2599 16.9887C20.3281 16.8804 20.3742 16.7597 20.3957 16.6336C20.4172 16.5075 20.4136 16.3783 20.3851 16.2536L20.109 15.0403C20.5996 14.5827 20.846 13.8897 20.6865 13.189L20.0375 10.34C19.9587 9.99676 19.7878 9.68151 19.5432 9.42818C19.2986 9.17484 18.9895 8.99303 18.6492 8.9023L16.3951 5.1865C16.0627 4.64056 15.5672 4.21277 14.9787 3.9635C14.3901 3.71423 13.7381 3.65606 13.1146 3.7972L4.45917 5.7662C3.83507 5.90756 3.27135 6.24186 2.84798 6.72167C2.42462 7.20147 2.16312 7.8024 2.10059 8.4392L1.67486 12.7644C1.40783 12.9937 1.20835 13.2914 1.09787 13.6255C0.987387 13.9596 0.970079 14.3176 1.04781 14.6608L1.69576 17.5098ZM5.01801 16.753C4.831 16.7956 4.63743 16.801 4.44835 16.7688C4.25926 16.7366 4.07837 16.6675 3.916 16.5654C3.75363 16.4633 3.61296 16.3302 3.50202 16.1738C3.39108 16.0173 3.31205 15.8405 3.26943 15.6535C3.22681 15.4666 3.22145 15.273 3.25364 15.0839C3.28583 14.8949 3.35495 14.714 3.45705 14.5516C3.55915 14.3893 3.69224 14.2486 3.8487 14.1377C4.00517 14.0267 4.18195 13.9477 4.36896 13.9051C4.74665 13.819 5.14305 13.8865 5.47098 14.0927C5.7989 14.2989 6.03148 14.6269 6.11755 15.0045C6.20362 15.3822 6.13613 15.7786 5.92992 16.1065C5.72372 16.4344 5.3957 16.6669 5.01801 16.753ZM17.3632 13.9458C17.173 13.9981 16.9741 14.0113 16.7787 13.9847C16.5832 13.958 16.3952 13.8921 16.2259 13.7908C16.0566 13.6896 15.9096 13.5551 15.7937 13.3954C15.6778 13.2358 15.5955 13.0544 15.5516 12.8621C15.5077 12.6698 15.5033 12.4706 15.5385 12.2765C15.5737 12.0824 15.6479 11.8975 15.7565 11.7328C15.8651 11.5682 16.006 11.4272 16.1706 11.3185C16.3351 11.2097 16.52 11.1355 16.7141 11.1001C17.0843 11.0327 17.4663 11.1107 17.7804 11.3179C18.0946 11.5251 18.3166 11.8456 18.4003 12.2124C18.484 12.5793 18.4228 12.9643 18.2296 13.2872C18.0364 13.6102 17.726 13.8461 17.3632 13.9458ZM4.94651 7.9112L13.6031 5.9411C13.7765 5.90191 13.9579 5.91808 14.1217 5.98734C14.2855 6.0566 14.4234 6.17546 14.5161 6.3272L16.2598 9.2015L15.6371 9.3434L4.58568 11.8591L3.96083 12.001L4.28976 8.6548C4.30746 8.47766 4.3804 8.31057 4.49825 8.17713C4.6161 8.0437 4.77291 7.95067 4.94651 7.9112ZM19.0452 2.2L17.4996 0L16.9495 3.3L19.6997 7.7L23 8.8L20.7998 6.0071L23 4.9808L20.7998 3.9545L23 0L19.0452 2.2Z");
    			attr_dev(path2, "fill-opacity", "0.6");
    			attr_dev(path2, "class", "svelte-tr5c1l");
    			add_location(path2, file$b, 22, 12, 2971);
    			attr_dev(svg2, "class", "links cards svelte-tr5c1l");
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg2, "width", "24");
    			attr_dev(svg2, "height", "24");
    			attr_dev(svg2, "viewBox", "0 0 24 24");
    			attr_dev(svg2, "fill", "none");
    			toggle_class(svg2, "active", /*$ActiveTab*/ ctx[1] === 'destroyed vehicles');
    			add_location(svg2, file$b, 21, 8, 2719);
    			attr_dev(path3, "d", "M14.7692 19.5C14.7692 20.2956 14.4775 21.0587 13.9581 21.6213C13.4388 22.1839 12.7344 22.5 12 22.5C11.2656 22.5 10.5612 22.1839 10.0419 21.6213C9.52253 21.0587 9.23077 20.2956 9.23077 19.5H14.7692ZM18.9231 18H3.83077C3.61044 18 3.39913 17.9051 3.24333 17.7364C3.08753 17.5676 3 17.3386 3 17.1C3 16.8613 3.08753 16.6323 3.24333 16.4635C3.39913 16.2948 3.61044 16.1999 3.83077 16.1999H5.07692V10.4999C5.07692 6.86986 7.45846 3.83983 10.6223 3.14983C10.603 2.94126 10.6242 2.73061 10.6847 2.53148C10.7451 2.33235 10.8434 2.14915 10.9732 1.9937C11.103 1.83826 11.2614 1.71401 11.4383 1.62897C11.6152 1.54393 11.8065 1.5 12 1.5C12.1935 1.5 12.3848 1.54393 12.5617 1.62897C12.7386 1.71401 12.897 1.83826 13.0268 1.9937C13.1566 2.14915 13.2549 2.33235 13.3153 2.53148C13.3758 2.73061 13.397 2.94126 13.3777 3.14983C14.9425 3.49463 16.3492 4.41461 17.3597 5.75402C18.3703 7.09343 18.9226 8.77 18.9231 10.4999V16.1999H20.1692C20.3896 16.1999 20.6009 16.2948 20.7567 16.4635C20.9125 16.6323 21 16.8613 21 17.1C21 17.3386 20.9125 17.5676 20.7567 17.7364C20.6009 17.9051 20.3896 18 20.1692 18H18.9231Z");
    			attr_dev(path3, "fill-opacity", "0.6");
    			attr_dev(path3, "class", "svelte-tr5c1l");
    			add_location(path3, file$b, 26, 12, 5909);
    			attr_dev(svg3, "class", "links transfer svelte-tr5c1l");
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "width", "24");
    			attr_dev(svg3, "height", "24");
    			attr_dev(svg3, "viewBox", "0 0 24 24");
    			attr_dev(svg3, "fill", "none");
    			toggle_class(svg3, "active", /*$ActiveTab*/ ctx[1] === 'notifications');
    			add_location(svg3, file$b, 25, 8, 5664);
    			attr_dev(div, "class", "content svelte-tr5c1l");
    			add_location(div, file$b, 12, 4, 354);
    			attr_dev(section, "class", "menu svelte-tr5c1l");
    			add_location(section, file$b, 11, 0, 326);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, svg0);
    			append_dev(svg0, path0);
    			append_dev(div, t0);
    			append_dev(div, svg1);
    			append_dev(svg1, path1);
    			append_dev(div, t1);
    			append_dev(div, svg2);
    			append_dev(svg2, path2);
    			append_dev(div, t2);
    			append_dev(div, svg3);
    			append_dev(svg3, path3);
    			if (if_block) if_block.m(svg3, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg0, "click", /*click_handler*/ ctx[4], false, false, false, false),
    					listen_dev(svg0, "keydown", keydown_handler$4, false, false, false, false),
    					listen_dev(svg1, "click", /*click_handler_1*/ ctx[5], false, false, false, false),
    					listen_dev(svg1, "keydown", keydown_handler_1$1, false, false, false, false),
    					listen_dev(svg2, "click", /*click_handler_2*/ ctx[6], false, false, false, false),
    					listen_dev(svg2, "keydown", keydown_handler_2, false, false, false, false),
    					listen_dev(svg3, "click", /*click_handler_3*/ ctx[7], false, false, false, false),
    					listen_dev(svg3, "keydown", keydown_handler_3, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$ActiveTab*/ 2) {
    				toggle_class(svg0, "active", /*$ActiveTab*/ ctx[1] === 'dashboard');
    			}

    			if (dirty & /*$ActiveTab*/ 2) {
    				toggle_class(svg1, "active", /*$ActiveTab*/ ctx[1] === 'your vehicles');
    			}

    			if (dirty & /*$ActiveTab*/ 2) {
    				toggle_class(svg2, "active", /*$ActiveTab*/ ctx[1] === 'destroyed vehicles');
    			}

    			if (/*messages*/ ctx[0].length > 0) {
    				if (if_block) ; else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(svg3, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*$ActiveTab*/ 2) {
    				toggle_class(svg3, "active", /*$ActiveTab*/ ctx[1] === 'notifications');
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$4 = () => {
    	
    };

    const keydown_handler_1$1 = () => {
    	
    };

    const keydown_handler_2 = () => {
    	
    };

    const keydown_handler_3 = () => {
    	
    };

    function instance$b($$self, $$props, $$invalidate) {
    	let messages;
    	let $notifications;
    	let $ActiveTab;
    	validate_store(notifications, 'notifications');
    	component_subscribe($$self, notifications, $$value => $$invalidate(3, $notifications = $$value));
    	validate_store(ActiveTab, 'ActiveTab');
    	component_subscribe($$self, ActiveTab, $$value => $$invalidate(1, $ActiveTab = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, []);
    	const dispatch = createEventDispatcher();

    	const changePage = tab => {
    		Detail.set();
    		ActiveTab.set(tab);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => changePage('dashboard');
    	const click_handler_1 = () => changePage('your vehicles');
    	const click_handler_2 = () => changePage('destroyed vehicles');
    	const click_handler_3 = () => changePage('notifications');

    	$$self.$capture_state = () => ({
    		ActiveTab,
    		Detail,
    		notifications,
    		createEventDispatcher,
    		dispatch,
    		changePage,
    		messages,
    		$notifications,
    		$ActiveTab
    	});

    	$$self.$inject_state = $$props => {
    		if ('messages' in $$props) $$invalidate(0, messages = $$props.messages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$notifications*/ 8) {
    			$$invalidate(0, messages = $notifications);
    		}
    	};

    	return [
    		messages,
    		$ActiveTab,
    		changePage,
    		$notifications,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\components\Pages\Home.svelte generated by Svelte v3.59.2 */

    const file$a = "src\\components\\Pages\\Home.svelte";

    function create_fragment$a(ctx) {
    	let section;

    	const block = {
    		c: function create() {
    			section = element("section");
    			add_location(section, file$a, 4, 0, 28);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Vehicle.svelte generated by Svelte v3.59.2 */
    const file$9 = "src\\components\\Vehicle.svelte";

    // (18:48) 
    function create_if_block_3$1(ctx) {
    	let svg;
    	let rect;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			attr_dev(rect, "width", "32");
    			attr_dev(rect, "height", "32");
    			attr_dev(rect, "rx", "16");
    			attr_dev(rect, "fill", "#6BC7B7");
    			attr_dev(rect, "class", "svelte-ipsptr");
    			add_location(rect, file$9, 19, 10, 2274);
    			attr_dev(path, "d", "M10.1667 22C9.01389 22 8.03111 21.582 7.21833 20.746C6.40556 19.91 5.99945 18.8994 6 17.7143C6 16.5286 6.40639 15.5177 7.21917 14.6817C8.03194 13.8457 9.01444 13.428 10.1667 13.4286H19.8333L18.1667 11.7143H15.1667V10H18.1458C18.3681 10 18.58 10.0429 18.7817 10.1286C18.9833 10.2143 19.1603 10.3357 19.3125 10.4929L22.2083 13.4714C23.2917 13.5571 24.1944 14.0071 24.9167 14.8214C25.6389 15.6357 26 16.6 26 17.7143C26 18.9 25.5936 19.9109 24.7808 20.7469C23.9681 21.5829 22.9856 22.0006 21.8333 22C20.6806 22 19.6978 21.582 18.885 20.746C18.0722 19.91 17.6661 18.8994 17.6667 17.7143C17.6667 17.4571 17.6842 17.2034 17.7192 16.9531C17.7542 16.7029 17.82 16.4566 17.9167 16.2143L15.625 18.5714H14.25C14.0556 19.5714 13.5764 20.3929 12.8125 21.0357C12.0486 21.6786 11.1667 22 10.1667 22ZM21.8333 20.2857C22.5278 20.2857 23.1181 20.0357 23.6042 19.5357C24.0903 19.0357 24.3333 18.4286 24.3333 17.7143C24.3333 17 24.0903 16.3929 23.6042 15.8929C23.1181 15.3929 22.5278 15.1429 21.8333 15.1429C21.1389 15.1429 20.5486 15.3929 20.0625 15.8929C19.5764 16.3929 19.3333 17 19.3333 17.7143C19.3333 18.4286 19.5764 19.0357 20.0625 19.5357C20.5486 20.0357 21.1389 20.2857 21.8333 20.2857ZM10.1667 20.2857C10.6944 20.2857 11.1703 20.1286 11.5942 19.8143C12.0181 19.5 12.32 19.0857 12.5 18.5714H10.1667V16.8571H12.5C12.3194 16.3429 12.0175 15.9286 11.5942 15.6143C11.1708 15.3 10.695 15.1429 10.1667 15.1429C9.47222 15.1429 8.88194 15.3929 8.39583 15.8929C7.90972 16.3929 7.66667 17 7.66667 17.7143C7.66667 18.4286 7.90972 19.0357 8.39583 19.5357C8.88194 20.0357 9.47222 20.2857 10.1667 20.2857Z");
    			attr_dev(path, "fill", "white");
    			attr_dev(path, "class", "svelte-ipsptr");
    			add_location(path, file$9, 20, 10, 2339);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "viewBox", "0 0 32 32");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$9, 18, 8, 2167);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(18:48) ",
    		ctx
    	});

    	return block;
    }

    // (13:6) {#if vehicle.type === 'auto'}
    function create_if_block_2$1(ctx) {
    	let svg;
    	let rect;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			attr_dev(rect, "width", "32");
    			attr_dev(rect, "height", "32");
    			attr_dev(rect, "rx", "16");
    			attr_dev(rect, "fill", "#6BC7B7");
    			attr_dev(rect, "class", "svelte-ipsptr");
    			add_location(rect, file$9, 14, 8, 561);
    			attr_dev(path, "d", "M10.6666 14.9522L11.8095 11.7379H20.1904L21.3333 14.9522M20.1904 18.5236C19.8873 18.5236 19.5966 18.4108 19.3823 18.2098C19.168 18.0089 19.0476 17.7364 19.0476 17.4522C19.0476 17.1681 19.168 16.8955 19.3823 16.6946C19.5966 16.4937 19.8873 16.3808 20.1904 16.3808C20.4935 16.3808 20.7842 16.4937 20.9986 16.6946C21.2129 16.8955 21.3333 17.1681 21.3333 17.4522C21.3333 17.7364 21.2129 18.0089 20.9986 18.2098C20.7842 18.4108 20.4935 18.5236 20.1904 18.5236ZM11.8095 18.5236C11.5064 18.5236 11.2157 18.4108 11.0014 18.2098C10.787 18.0089 10.6666 17.7364 10.6666 17.4522C10.6666 17.1681 10.787 16.8955 11.0014 16.6946C11.2157 16.4937 11.5064 16.3808 11.8095 16.3808C12.1126 16.3808 12.4033 16.4937 12.6176 16.6946C12.8319 16.8955 12.9523 17.1681 12.9523 17.4522C12.9523 17.7364 12.8319 18.0089 12.6176 18.2098C12.4033 18.4108 12.1126 18.5236 11.8095 18.5236ZM21.2723 11.3808C21.12 10.9665 20.6933 10.6665 20.1904 10.6665H11.8095C11.3066 10.6665 10.88 10.9665 10.7276 11.3808L9.14282 15.6665V21.3808C9.14282 21.5702 9.22309 21.7519 9.36598 21.8859C9.50886 22.0198 9.70266 22.0951 9.90473 22.0951H10.6666C10.8687 22.0951 11.0625 22.0198 11.2054 21.8859C11.3483 21.7519 11.4285 21.5702 11.4285 21.3808V20.6665H20.5714V21.3808C20.5714 21.5702 20.6517 21.7519 20.7945 21.8859C20.9374 22.0198 21.1312 22.0951 21.3333 22.0951H22.0952C22.2973 22.0951 22.4911 22.0198 22.634 21.8859C22.7768 21.7519 22.8571 21.5702 22.8571 21.3808V15.6665L21.2723 11.3808Z");
    			attr_dev(path, "fill", "white");
    			attr_dev(path, "class", "svelte-ipsptr");
    			add_location(path, file$9, 15, 8, 624);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "viewBox", "0 0 32 32");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$9, 13, 8, 456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(13:6) {#if vehicle.type === 'auto'}",
    		ctx
    	});

    	return block;
    }

    // (41:71) 
    function create_if_block_1$2(ctx) {
    	let svg;
    	let g;
    	let path;
    	let defs;
    	let clipPath;
    	let rect;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect = svg_element("rect");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "clip-rule", "evenodd");
    			attr_dev(path, "d", "M16.8319 2.83726L25.1282 6.35968C25.5801 6.55147 25.9696 6.89489 26.2445 7.34402C26.5194 7.79314 26.6666 8.32658 26.6666 8.87301V16.0695C26.6666 18.3123 26.115 20.5109 25.0736 22.4188C24.0322 24.3267 22.5421 25.8685 20.7703 26.8716L16.7952 29.1206C16.5483 29.2604 16.276 29.3332 15.9999 29.3332C15.7238 29.3332 15.4516 29.2604 15.2047 29.1206L11.2295 26.8702C9.45774 25.8672 7.96764 24.3253 6.92622 22.4174C5.8848 20.5095 5.33321 18.311 5.33325 16.0681V8.87435C5.33295 8.32769 5.4801 7.79396 5.75502 7.34457C6.02994 6.89518 6.41951 6.55156 6.87162 6.35968L15.1679 2.83726C15.7044 2.60959 16.2955 2.60959 16.8319 2.83726ZM15.9999 18.6781C15.6856 18.6781 15.3841 18.8195 15.1619 19.0711C14.9396 19.3228 14.8147 19.6641 14.8147 20.02C14.8147 20.3758 14.9396 20.7172 15.1619 20.9688C15.3841 21.2205 15.6856 21.3618 15.9999 21.3618C16.3142 21.3618 16.6157 21.2205 16.838 20.9688C17.0602 20.7172 17.1851 20.3758 17.1851 20.02C17.1851 19.6641 17.0602 19.3228 16.838 19.0711C16.6157 18.8195 16.3142 18.6781 15.9999 18.6781ZM15.9999 9.28496C15.7096 9.28501 15.4294 9.40567 15.2125 9.62408C14.9956 9.84248 14.857 10.1434 14.823 10.4698L14.8147 10.6268V15.9943C14.8151 16.3364 14.9307 16.6653 15.1381 16.914C15.3455 17.1627 15.6289 17.3124 15.9305 17.3324C16.232 17.3525 16.529 17.2414 16.7606 17.0219C16.9923 16.8023 17.1411 16.491 17.1768 16.1513L17.1851 15.9943V10.6268C17.1851 10.271 17.0602 9.92964 16.838 9.67799C16.6157 9.42634 16.3142 9.28496 15.9999 9.28496Z");
    			attr_dev(path, "fill", "#E86B61");
    			attr_dev(path, "class", "svelte-ipsptr");
    			add_location(path, file$9, 43, 12, 6418);
    			attr_dev(g, "clip-path", "url(#clip0_18738_449)");
    			add_location(g, file$9, 42, 10, 6367);
    			attr_dev(rect, "width", "32");
    			attr_dev(rect, "height", "32");
    			attr_dev(rect, "fill", "white");
    			attr_dev(rect, "class", "svelte-ipsptr");
    			add_location(rect, file$9, 47, 14, 8036);
    			attr_dev(clipPath, "id", "clip0_18738_449");
    			add_location(clipPath, file$9, 46, 12, 7989);
    			add_location(defs, file$9, 45, 10, 7969);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "viewBox", "0 0 32 32");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$9, 41, 8, 6260);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(41:71) ",
    		ctx
    	});

    	return block;
    }

    // (30:6) {#if !vehicle.destroyed && vehicle.status === 'insured'}
    function create_if_block$2(ctx) {
    	let svg;
    	let g;
    	let path;
    	let defs;
    	let clipPath;
    	let rect;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect = svg_element("rect");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "clip-rule", "evenodd");
    			attr_dev(path, "d", "M15.1679 2.83668C15.6356 2.63855 16.1466 2.61273 16.6281 2.76288L16.8319 2.83668L25.1282 6.35908C25.5489 6.53767 25.916 6.84793 26.1869 7.25371C26.4578 7.65949 26.6213 8.14407 26.6583 8.65099L26.6666 8.8724V16.0688C26.6665 18.2432 26.148 20.3773 25.1657 22.2457C24.1834 24.1141 22.7737 25.6476 21.0855 26.6844L20.7703 26.8709L16.7952 29.1212C16.5763 29.2449 16.3372 29.3162 16.0929 29.3305C15.8486 29.3448 15.6043 29.3019 15.3753 29.2044L15.2047 29.1212L11.2295 26.8709C9.51175 25.8984 8.05773 24.4189 7.02096 22.5885C5.98419 20.758 5.40315 18.6447 5.33918 16.4714L5.33325 16.0688V8.8724C5.33326 8.36401 5.46081 7.86607 5.70105 7.43656C5.9413 7.00705 6.28436 6.66364 6.69029 6.4463L6.87162 6.35908L15.1679 2.83668ZM20.0687 11.4703L14.6192 17.6402L12.5238 15.2677C12.3014 15.0161 11.9998 14.8748 11.6854 14.875C11.371 14.8751 11.0696 15.0166 10.8473 15.2684C10.6251 15.5202 10.5003 15.8616 10.5004 16.2176C10.5005 16.5735 10.6255 16.9149 10.8479 17.1665L13.6971 20.3923C13.8182 20.5295 13.9619 20.6383 14.1201 20.7125C14.2783 20.7867 14.4479 20.8249 14.6192 20.8249C14.7904 20.8249 14.96 20.7867 15.1182 20.7125C15.2764 20.6383 15.4202 20.5295 15.5413 20.3923L21.7445 13.3677C21.8577 13.2439 21.948 13.0958 22.0101 12.9321C22.0722 12.7684 22.1049 12.5923 22.1063 12.4141C22.1077 12.236 22.0777 12.0593 22.0181 11.8943C21.9585 11.7294 21.8705 11.5796 21.7592 11.4536C21.6479 11.3276 21.5156 11.228 21.3699 11.1605C21.2243 11.0931 21.0682 11.0591 20.9108 11.0607C20.7535 11.0622 20.598 11.0992 20.4534 11.1695C20.3088 11.2399 20.178 11.3421 20.0687 11.4703Z");
    			attr_dev(path, "fill", "#2FC0A7");
    			attr_dev(path, "class", "svelte-ipsptr");
    			add_location(path, file$9, 32, 10, 4372);
    			attr_dev(g, "clip-path", "url(#clip0_18738_507)");
    			add_location(g, file$9, 31, 8, 4323);
    			attr_dev(rect, "width", "32");
    			attr_dev(rect, "height", "32");
    			attr_dev(rect, "fill", "white");
    			attr_dev(rect, "class", "svelte-ipsptr");
    			add_location(rect, file$9, 36, 12, 6080);
    			attr_dev(clipPath, "id", "clip0_18738_507");
    			add_location(clipPath, file$9, 35, 10, 6035);
    			add_location(defs, file$9, 34, 8, 6017);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "viewBox", "0 0 32 32");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$9, 30, 6, 4218);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(30:6) {#if !vehicle.destroyed && vehicle.status === 'insured'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div2;
    	let article;
    	let section;
    	let t0;
    	let div0;
    	let p;
    	let t1_value = /*vehicle*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let h4;
    	let t3_value = /*vehicle*/ ctx[0].status + "";
    	let t3;
    	let t4;
    	let div1;
    	let t5;
    	let svg;
    	let path;
    	let div2_class_value;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*vehicle*/ ctx[0].type === 'auto') return create_if_block_2$1;
    		if (/*vehicle*/ ctx[0].type === 'motorcycle') return create_if_block_3$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type && current_block_type(ctx);

    	function select_block_type_1(ctx, dirty) {
    		if (!/*vehicle*/ ctx[0].destroyed && /*vehicle*/ ctx[0].status === 'insured') return create_if_block$2;
    		if (!/*vehicle*/ ctx[0].destroyed && /*vehicle*/ ctx[0].status === 'uninsured') return create_if_block_1$2;
    	}

    	let current_block_type_1 = select_block_type_1(ctx);
    	let if_block1 = current_block_type_1 && current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			article = element("article");
    			section = element("section");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			p = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			h4 = element("h4");
    			t3 = text(t3_value);
    			t4 = space();
    			div1 = element("div");
    			if (if_block1) if_block1.c();
    			t5 = space();
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(p, "class", "name svelte-ipsptr");
    			add_location(p, file$9, 24, 10, 3997);
    			attr_dev(h4, "class", "status svelte-ipsptr");
    			add_location(h4, file$9, 25, 10, 4043);
    			add_location(div0, file$9, 23, 6, 3980);
    			attr_dev(section, "class", "svelte-ipsptr");
    			add_location(section, file$9, 11, 4, 400);
    			attr_dev(div1, "class", "svelte-ipsptr");
    			toggle_class(div1, "hide", /*hoverOn*/ ctx[1]);
    			add_location(div1, file$9, 28, 4, 4119);
    			attr_dev(article, "class", "svelte-ipsptr");
    			add_location(article, file$9, 10, 2, 385);
    			attr_dev(path, "d", "M13.6667 -1.17622e-06L21.6667 8L13.6667 16L11.8001 14.0667L16.5334 9.33333L0.333415 9.33333L0.333415 6.66666L16.5334 6.66667L11.8001 1.93333L13.6667 -1.17622e-06Z");
    			attr_dev(path, "fill", "#379F8D");
    			attr_dev(path, "class", "svelte-ipsptr");
    			add_location(path, file$9, 55, 4, 8342);
    			attr_dev(svg, "class", "arrow svelte-ipsptr");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "22");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "viewBox", "0 0 22 16");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$9, 54, 2, 8182);

    			attr_dev(div2, "class", div2_class_value = "" + ((/*vehicle*/ ctx[0].destroyed
    			? 'destroyed'
    			: /*vehicle*/ ctx[0].status) + "-cont vehicle" + " svelte-ipsptr"));

    			add_location(div2, file$9, 9, 0, 193);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, article);
    			append_dev(article, section);
    			if (if_block0) if_block0.m(section, null);
    			append_dev(section, t0);
    			append_dev(section, div0);
    			append_dev(div0, p);
    			append_dev(p, t1);
    			append_dev(div0, t2);
    			append_dev(div0, h4);
    			append_dev(h4, t3);
    			append_dev(article, t4);
    			append_dev(article, div1);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div2, t5);
    			append_dev(div2, svg);
    			append_dev(svg, path);

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg, "click", /*handleClick*/ ctx[2], false, false, false, false),
    					listen_dev(svg, "keydown", keydown_handler$3, false, false, false, false),
    					listen_dev(div2, "mouseover", /*mouseover_handler*/ ctx[3], false, false, false, false),
    					listen_dev(div2, "mouseout", /*mouseout_handler*/ ctx[4], false, false, false, false),
    					listen_dev(div2, "blur", blur_handler, false, false, false, false),
    					listen_dev(div2, "focus", focus_handler, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if (if_block0) if_block0.d(1);
    				if_block0 = current_block_type && current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(section, t0);
    				}
    			}

    			if (dirty & /*vehicle*/ 1 && t1_value !== (t1_value = /*vehicle*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*vehicle*/ 1 && t3_value !== (t3_value = /*vehicle*/ ctx[0].status + "")) set_data_dev(t3, t3_value);

    			if (current_block_type_1 !== (current_block_type_1 = select_block_type_1(ctx))) {
    				if (if_block1) if_block1.d(1);
    				if_block1 = current_block_type_1 && current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			}

    			if (dirty & /*hoverOn*/ 2) {
    				toggle_class(div1, "hide", /*hoverOn*/ ctx[1]);
    			}

    			if (dirty & /*vehicle*/ 1 && div2_class_value !== (div2_class_value = "" + ((/*vehicle*/ ctx[0].destroyed
    			? 'destroyed'
    			: /*vehicle*/ ctx[0].status) + "-cont vehicle" + " svelte-ipsptr"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			if (if_block0) {
    				if_block0.d();
    			}

    			if (if_block1) {
    				if_block1.d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$3 = () => {
    	
    };

    const blur_handler = () => {
    	
    };

    const focus_handler = () => {
    	
    };

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Vehicle', slots, []);
    	let { vehicle } = $$props;

    	const handleClick = () => {
    		Detail.set({ ...vehicle });
    	};

    	let hoverOn = false;

    	$$self.$$.on_mount.push(function () {
    		if (vehicle === undefined && !('vehicle' in $$props || $$self.$$.bound[$$self.$$.props['vehicle']])) {
    			console.warn("<Vehicle> was created without expected prop 'vehicle'");
    		}
    	});

    	const writable_props = ['vehicle'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Vehicle> was created with unknown prop '${key}'`);
    	});

    	const mouseover_handler = () => $$invalidate(1, hoverOn = true);
    	const mouseout_handler = () => $$invalidate(1, hoverOn = false);

    	$$self.$$set = $$props => {
    		if ('vehicle' in $$props) $$invalidate(0, vehicle = $$props.vehicle);
    	};

    	$$self.$capture_state = () => ({
    		checkDetail,
    		Detail,
    		vehicle,
    		handleClick,
    		hoverOn
    	});

    	$$self.$inject_state = $$props => {
    		if ('vehicle' in $$props) $$invalidate(0, vehicle = $$props.vehicle);
    		if ('hoverOn' in $$props) $$invalidate(1, hoverOn = $$props.hoverOn);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [vehicle, hoverOn, handleClick, mouseover_handler, mouseout_handler];
    }

    class Vehicle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { vehicle: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Vehicle",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get vehicle() {
    		throw new Error("<Vehicle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set vehicle(value) {
    		throw new Error("<Vehicle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Pages\Vehicles.svelte generated by Svelte v3.59.2 */
    const file$8 = "src\\components\\Pages\\Vehicles.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (7:4) {#each $vehicles as vehicle (vehicle.id) }
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let vehicle;
    	let current;

    	vehicle = new Vehicle({
    			props: { vehicle: /*vehicle*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(vehicle.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(vehicle, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const vehicle_changes = {};
    			if (dirty & /*$vehicles*/ 1) vehicle_changes.vehicle = /*vehicle*/ ctx[1];
    			vehicle.$set(vehicle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(vehicle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(vehicle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(vehicle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(7:4) {#each $vehicles as vehicle (vehicle.id) }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let section;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let each_value = /*$vehicles*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*vehicle*/ ctx[1].id;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(section, "class", "svelte-jbdfzx");
    			add_location(section, file$8, 5, 0, 121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(section, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$vehicles*/ 1) {
    				each_value = /*$vehicles*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, section, outro_and_destroy_block, create_each_block$1, null, get_each_context$1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $vehicles;
    	validate_store(vehicles, 'vehicles');
    	component_subscribe($$self, vehicles, $$value => $$invalidate(0, $vehicles = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Vehicles', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Vehicles> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Vehicle, vehicles, $vehicles });
    	return [$vehicles];
    }

    class Vehicles extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Vehicles",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\components\Pages\DestroyedVehicles.svelte generated by Svelte v3.59.2 */
    const file$7 = "src\\components\\Pages\\DestroyedVehicles.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (10:4) {#each $destroyedVehicles as vehicle (vehicle.id) }
    function create_each_block(key_1, ctx) {
    	let first;
    	let vehicle;
    	let current;

    	vehicle = new Vehicle({
    			props: { vehicle: /*vehicle*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(vehicle.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(vehicle, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const vehicle_changes = {};
    			if (dirty & /*$destroyedVehicles*/ 1) vehicle_changes.vehicle = /*vehicle*/ ctx[2];
    			vehicle.$set(vehicle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(vehicle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(vehicle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(vehicle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(10:4) {#each $destroyedVehicles as vehicle (vehicle.id) }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let section;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t0;
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*$destroyedVehicles*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*vehicle*/ ctx[2].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			button = element("button");
    			button.textContent = "CLAIM ALL VEHICLES";
    			attr_dev(button, "class", "svelte-20p7an");
    			add_location(button, file$7, 12, 4, 314);
    			attr_dev(section, "class", "destroyed-vehicles svelte-20p7an");
    			add_location(section, file$7, 8, 0, 171);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(section, null);
    				}
    			}

    			append_dev(section, t0);
    			append_dev(section, button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*claimVehicles*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$destroyedVehicles*/ 1) {
    				each_value = /*$destroyedVehicles*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, section, outro_and_destroy_block, create_each_block, t0, get_each_context);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $destroyedVehicles;
    	validate_store(destroyedVehicles, 'destroyedVehicles');
    	component_subscribe($$self, destroyedVehicles, $$value => $$invalidate(0, $destroyedVehicles = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DestroyedVehicles', slots, []);

    	const claimVehicles = () => {
    		
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DestroyedVehicles> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		destroyedVehicles,
    		Vehicle,
    		claimVehicles,
    		$destroyedVehicles
    	});

    	return [$destroyedVehicles, claimVehicles];
    }

    class DestroyedVehicles extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DestroyedVehicles",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\Pages\Notifications.svelte generated by Svelte v3.59.2 */

    const file$6 = "src\\components\\Pages\\Notifications.svelte";

    function create_fragment$6(ctx) {
    	let section;

    	const block = {
    		c: function create() {
    			section = element("section");
    			attr_dev(section, "class", "svelte-c3czr3");
    			add_location(section, file$6, 4, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Notifications', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Notifications> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Notifications extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Notifications",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\shared\Modal.svelte generated by Svelte v3.59.2 */

    const file$5 = "src\\components\\shared\\Modal.svelte";
    const get_amount_slot_changes = dirty => ({});
    const get_amount_slot_context = ctx => ({});
    const get_info_slot_changes = dirty => ({});
    const get_info_slot_context = ctx => ({});

    function create_fragment$5(ctx) {
    	let section;
    	let t;
    	let current;
    	const info_slot_template = /*#slots*/ ctx[1].info;
    	const info_slot = create_slot(info_slot_template, ctx, /*$$scope*/ ctx[0], get_info_slot_context);
    	const amount_slot_template = /*#slots*/ ctx[1].amount;
    	const amount_slot = create_slot(amount_slot_template, ctx, /*$$scope*/ ctx[0], get_amount_slot_context);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (info_slot) info_slot.c();
    			t = space();
    			if (amount_slot) amount_slot.c();
    			attr_dev(section, "class", "svelte-1726m3a");
    			add_location(section, file$5, 5, 0, 27);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			if (info_slot) {
    				info_slot.m(section, null);
    			}

    			append_dev(section, t);

    			if (amount_slot) {
    				amount_slot.m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (info_slot) {
    				if (info_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						info_slot,
    						info_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(info_slot_template, /*$$scope*/ ctx[0], dirty, get_info_slot_changes),
    						get_info_slot_context
    					);
    				}
    			}

    			if (amount_slot) {
    				if (amount_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						amount_slot,
    						amount_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(amount_slot_template, /*$$scope*/ ctx[0], dirty, get_amount_slot_changes),
    						get_amount_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info_slot, local);
    			transition_in(amount_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(info_slot, local);
    			transition_out(amount_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (info_slot) info_slot.d(detaching);
    			if (amount_slot) amount_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['info','amount']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\shared\Popup.svelte generated by Svelte v3.59.2 */
    const file$4 = "src\\components\\shared\\Popup.svelte";

    // (49:12) 
    function create_info_slot(ctx) {
    	let p;
    	let t0;

    	let t1_value = (/*$Detail*/ ctx[3].status === 'insured'
    	? 'refunded'
    	: 'taken') + "";

    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("The insurance amount will be ");
    			t1 = text(t1_value);
    			attr_dev(p, "slot", "info");
    			attr_dev(p, "class", "svelte-vtmphe");
    			add_location(p, file$4, 48, 12, 1472);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$Detail*/ 8 && t1_value !== (t1_value = (/*$Detail*/ ctx[3].status === 'insured'
    			? 'refunded'
    			: 'taken') + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_info_slot.name,
    		type: "slot",
    		source: "(49:12) ",
    		ctx
    	});

    	return block;
    }

    // (50:12) 
    function create_amount_slot(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "$5609";
    			attr_dev(h2, "slot", "amount");
    			attr_dev(h2, "class", "svelte-vtmphe");
    			add_location(h2, file$4, 49, 12, 1587);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_amount_slot.name,
    		type: "slot",
    		source: "(50:12) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let section;
    	let p;
    	let t1;

    	let t2_value = (/*$Detail*/ ctx[3].status === 'insured'
    	? 'cancel'
    	: 'get') + "";

    	let t2;
    	let t3;
    	let t4;
    	let h3;
    	let t5_value = /*$Detail*/ ctx[3].name + "";
    	let t5;
    	let t6;
    	let div1;
    	let button0;
    	let t8;
    	let button1;
    	let t9;
    	let button1_class_value;
    	let t10;
    	let div2;
    	let modal;
    	let current;
    	let mounted;
    	let dispose;

    	modal = new Modal({
    			props: {
    				$$slots: {
    					amount: [create_amount_slot],
    					info: [create_info_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			section = element("section");
    			p = element("p");
    			t1 = text("Are you sure you want to ");
    			t2 = text(t2_value);
    			t3 = text(" insurance for");
    			t4 = space();
    			h3 = element("h3");
    			t5 = text(t5_value);
    			t6 = space();
    			div1 = element("div");
    			button0 = element("button");
    			button0.textContent = "CANCEL";
    			t8 = space();
    			button1 = element("button");
    			t9 = text("CONFIRM");
    			t10 = space();
    			div2 = element("div");
    			create_component(modal.$$.fragment);
    			attr_dev(div0, "class", "black-bg svelte-vtmphe");
    			toggle_class(div0, "change", /*opac*/ ctx[1]);
    			add_location(div0, file$4, 33, 4, 809);
    			attr_dev(p, "class", "svelte-vtmphe");
    			add_location(p, file$4, 35, 8, 899);
    			attr_dev(h3, "class", "svelte-vtmphe");
    			add_location(h3, file$4, 36, 8, 1004);
    			attr_dev(button0, "class", "cancel svelte-vtmphe");
    			add_location(button0, file$4, 38, 12, 1074);

    			attr_dev(button1, "class", button1_class_value = "" + (null_to_empty(/*$Detail*/ ctx[3].status === 'insured'
    			? 'confirm-cancel'
    			: 'confirm-get') + " svelte-vtmphe"));

    			add_location(button1, file$4, 39, 12, 1145);
    			attr_dev(div1, "class", "btns-cont svelte-vtmphe");
    			add_location(div1, file$4, 37, 8, 1037);
    			attr_dev(section, "class", "svelte-vtmphe");
    			toggle_class(section, "hide", /*pop*/ ctx[0]);
    			add_location(section, file$4, 34, 4, 863);
    			attr_dev(div2, "class", "svelte-vtmphe");
    			toggle_class(div2, "hide-notify", !/*notify*/ ctx[2]);
    			add_location(div2, file$4, 46, 4, 1408);
    			attr_dev(div3, "class", "popup-cont svelte-vtmphe");
    			add_location(div3, file$4, 32, 0, 732);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t0);
    			append_dev(div3, section);
    			append_dev(section, p);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(section, t4);
    			append_dev(section, h3);
    			append_dev(h3, t5);
    			append_dev(section, t6);
    			append_dev(section, div1);
    			append_dev(div1, button0);
    			append_dev(div1, t8);
    			append_dev(div1, button1);
    			append_dev(button1, t9);
    			append_dev(div3, t10);
    			append_dev(div3, div2);
    			mount_component(modal, div2, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*popInfo*/ ctx[4], false, false, false, false),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*$Detail*/ ctx[3].status === 'insured'
    							? /*confirmCancel*/ ctx[6]()
    							: /*confirmGet*/ ctx[5]())) (/*$Detail*/ ctx[3].status === 'insured'
    							? /*confirmCancel*/ ctx[6]()
    							: /*confirmGet*/ ctx[5]()).apply(this, arguments);
    						},
    						false,
    						false,
    						false,
    						false
    					),
    					listen_dev(div3, "click", self(/*popInfo*/ ctx[4]), false, false, false, false),
    					listen_dev(div3, "keydown", keydown_handler$2, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (!current || dirty & /*opac*/ 2) {
    				toggle_class(div0, "change", /*opac*/ ctx[1]);
    			}

    			if ((!current || dirty & /*$Detail*/ 8) && t2_value !== (t2_value = (/*$Detail*/ ctx[3].status === 'insured'
    			? 'cancel'
    			: 'get') + "")) set_data_dev(t2, t2_value);

    			if ((!current || dirty & /*$Detail*/ 8) && t5_value !== (t5_value = /*$Detail*/ ctx[3].name + "")) set_data_dev(t5, t5_value);

    			if (!current || dirty & /*$Detail*/ 8 && button1_class_value !== (button1_class_value = "" + (null_to_empty(/*$Detail*/ ctx[3].status === 'insured'
    			? 'confirm-cancel'
    			: 'confirm-get') + " svelte-vtmphe"))) {
    				attr_dev(button1, "class", button1_class_value);
    			}

    			if (!current || dirty & /*pop*/ 1) {
    				toggle_class(section, "hide", /*pop*/ ctx[0]);
    			}

    			const modal_changes = {};

    			if (dirty & /*$$scope, $Detail*/ 136) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);

    			if (!current || dirty & /*notify*/ 4) {
    				toggle_class(div2, "hide-notify", !/*notify*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(modal);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$2 = () => {
    	
    };

    function instance$4($$self, $$props, $$invalidate) {
    	let $Detail;
    	validate_store(Detail, 'Detail');
    	component_subscribe($$self, Detail, $$value => $$invalidate(3, $Detail = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Popup', slots, []);
    	let pop = true;
    	let opac = true;
    	let notify = false;

    	onMount(() => {
    		setTimeout(
    			() => {
    				$$invalidate(0, pop = false);
    				$$invalidate(1, opac = false);
    			},
    			200
    		);
    	});

    	const popInfo = () => {
    		$$invalidate(0, pop = true);
    		$$invalidate(1, opac = true);

    		setTimeout(
    			() => {
    				$$invalidate(0, pop = false);
    				$$invalidate(1, opac = false);
    				checkDetail.set(false);
    			},
    			200
    		);
    	};

    	const confirmGet = () => {
    		$$invalidate(2, notify = true);
    		$$invalidate(0, pop = true);
    	};

    	const confirmCancel = () => {
    		$$invalidate(2, notify = true);
    		$$invalidate(0, pop = true);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Popup> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Modal,
    		checkDetail,
    		Detail,
    		ActiveTab,
    		onMount,
    		pop,
    		opac,
    		notify,
    		popInfo,
    		confirmGet,
    		confirmCancel,
    		$Detail
    	});

    	$$self.$inject_state = $$props => {
    		if ('pop' in $$props) $$invalidate(0, pop = $$props.pop);
    		if ('opac' in $$props) $$invalidate(1, opac = $$props.opac);
    		if ('notify' in $$props) $$invalidate(2, notify = $$props.notify);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pop, opac, notify, $Detail, popInfo, confirmGet, confirmCancel];
    }

    class Popup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Popup",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\DetailHeader.svelte generated by Svelte v3.59.2 */
    const file$3 = "src\\components\\DetailHeader.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let div;
    	let svg0;
    	let path0;
    	let t0;
    	let t1;
    	let h4;
    	let t3;
    	let svg1;
    	let path1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = text(" BACK");
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Details";
    			t3 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M7.64331 16L9 14.58L2.71338 8L9 1.42L7.64331 0L0 8L7.64331 16Z");
    			attr_dev(path0, "fill", "#0975FD");
    			attr_dev(path0, "class", "svelte-1z0a96c");
    			add_location(path0, file$3, 7, 12, 284);
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "width", "9");
    			attr_dev(svg0, "height", "16");
    			attr_dev(svg0, "viewBox", "0 0 9 16");
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "class", "svelte-1z0a96c");
    			add_location(svg0, file$3, 6, 8, 177);
    			attr_dev(div, "class", "back svelte-1z0a96c");
    			add_location(div, file$3, 5, 4, 97);
    			attr_dev(h4, "class", "svelte-1z0a96c");
    			add_location(h4, file$3, 10, 4, 412);
    			attr_dev(path1, "d", "M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6755 19.2869 15.7128 20.0956 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6445 22.0818 12.325 22.1663 12 22.1663C11.675 22.1663 11.3555 22.0818 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42298 20.2083 7.38707 19.3489 6.442 18.395C4.676 16.588 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 8C11.606 8 11.2159 8.0776 10.8519 8.22836C10.488 8.37913 10.1573 8.6001 9.87868 8.87868C9.6001 9.15726 9.37913 9.48797 9.22836 9.85195C9.0776 10.2159 9 10.606 9 11C9 11.394 9.0776 11.7841 9.22836 12.1481C9.37913 12.512 9.6001 12.8427 9.87868 13.1213C10.1573 13.3999 10.488 13.6209 10.8519 13.7716C11.2159 13.9224 11.606 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8Z");
    			attr_dev(path1, "fill", "#787F85");
    			attr_dev(path1, "class", "svelte-1z0a96c");
    			add_location(path1, file$3, 12, 8, 599);
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "width", "24");
    			attr_dev(svg1, "height", "24");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "fill", "none");
    			attr_dev(svg1, "class", "svelte-1z0a96c");
    			add_location(svg1, file$3, 11, 4, 434);
    			attr_dev(section, "class", "svelte-1z0a96c");
    			add_location(section, file$3, 4, 0, 82);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			append_dev(div, svg0);
    			append_dev(svg0, path0);
    			append_dev(div, t0);
    			append_dev(section, t1);
    			append_dev(section, h4);
    			append_dev(section, t3);
    			append_dev(section, svg1);
    			append_dev(svg1, path1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler*/ ctx[0], false, false, false, false),
    					listen_dev(div, "keydown", keydown_handler$1, false, false, false, false),
    					listen_dev(svg1, "click", /*click_handler_1*/ ctx[1], false, false, false, false),
    					listen_dev(svg1, "keydown", keydown_handler_1, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$1 = () => {
    	
    };

    const keydown_handler_1 = () => {
    	
    };

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DetailHeader', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DetailHeader> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => Detail.set();
    	const click_handler_1 = () => isLocation.set(true);
    	$$self.$capture_state = () => ({ Detail, isLocation });
    	return [click_handler, click_handler_1];
    }

    class DetailHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DetailHeader",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\shared\Details.svelte generated by Svelte v3.59.2 */
    const file$2 = "src\\components\\shared\\Details.svelte";

    // (20:12) {:else}
    function create_else_block$1(ctx) {
    	let svg;
    	let g;
    	let path;
    	let defs;
    	let clipPath;
    	let rect;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect = svg_element("rect");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "clip-rule", "evenodd");
    			attr_dev(path, "d", "M10.52 1.77322L15.7052 3.97474C15.9876 4.09461 16.231 4.30925 16.4028 4.58995C16.5747 4.87065 16.6667 5.20405 16.6667 5.54557V10.0434C16.6667 11.4451 16.3219 12.8192 15.6711 14.0117C15.0202 15.2041 14.0889 16.1678 12.9815 16.7947L10.497 18.2003C10.3427 18.2877 10.1725 18.3332 9.99999 18.3332C9.82745 18.3332 9.65728 18.2877 9.50296 18.2003L7.01851 16.7938C5.91113 16.1669 4.97982 15.2033 4.32894 14.0108C3.67805 12.8184 3.3333 11.4443 3.33333 10.0425V5.54641C3.33314 5.20474 3.42511 4.87116 3.59693 4.59029C3.76876 4.30942 4.01224 4.09466 4.29481 3.97474L9.48 1.77322C9.81527 1.63093 10.1847 1.63093 10.52 1.77322ZM9.99999 11.6737C9.80354 11.6737 9.61513 11.7621 9.47621 11.9194C9.3373 12.0767 9.25925 12.29 9.25925 12.5124C9.25925 12.7348 9.3373 12.9482 9.47621 13.1054C9.61513 13.2627 9.80354 13.3511 9.99999 13.3511C10.1965 13.3511 10.3849 13.2627 10.5238 13.1054C10.6627 12.9482 10.7407 12.7348 10.7407 12.5124C10.7407 12.29 10.6627 12.0767 10.5238 11.9194C10.3849 11.7621 10.1965 11.6737 9.99999 11.6737ZM9.99999 5.80304C9.81856 5.80307 9.64345 5.87849 9.50787 6.01499C9.37229 6.15149 9.28567 6.33958 9.26444 6.54359L9.25925 6.64171V9.9964C9.25946 10.2102 9.33176 10.4158 9.46136 10.5712C9.59097 10.7266 9.76811 10.8202 9.95658 10.8327C10.1451 10.8452 10.3306 10.7758 10.4754 10.6386C10.6202 10.5014 10.7133 10.3068 10.7356 10.0945L10.7407 9.9964V6.64171C10.7407 6.41928 10.6627 6.20596 10.5238 6.04868C10.3849 5.8914 10.1965 5.80304 9.99999 5.80304Z");
    			attr_dev(path, "fill", "#E86B61");
    			add_location(path, file$2, 22, 16, 2498);
    			attr_dev(g, "clip-path", "url(#clip0_18844_95)");
    			add_location(g, file$2, 21, 16, 2444);
    			attr_dev(rect, "width", "20");
    			attr_dev(rect, "height", "20");
    			attr_dev(rect, "fill", "white");
    			add_location(rect, file$2, 26, 16, 4133);
    			attr_dev(clipPath, "id", "clip0_18844_95");
    			add_location(clipPath, file$2, 25, 16, 4085);
    			add_location(defs, file$2, 24, 16, 4061);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "20");
    			attr_dev(svg, "height", "20");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$2, 20, 12, 2331);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(20:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (9:12) {#if $Detail.status === 'insured'}
    function create_if_block_1$1(ctx) {
    	let svg;
    	let g;
    	let path;
    	let defs;
    	let clipPath;
    	let rect;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path = svg_element("path");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect = svg_element("rect");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "clip-rule", "evenodd");
    			attr_dev(path, "d", "M9.47992 1.77286C9.77223 1.64904 10.0916 1.63289 10.3925 1.72674L10.5199 1.77286L15.7051 3.97437C15.968 4.08598 16.1975 4.2799 16.3668 4.53351C16.5361 4.78712 16.6383 5.08998 16.6614 5.40681L16.6666 5.54519V10.043C16.6666 11.402 16.3425 12.7357 15.7285 13.9035C15.1146 15.0713 14.2335 16.0297 13.1784 16.6777L12.9814 16.7942L10.497 18.2007C10.3602 18.278 10.2107 18.3225 10.058 18.3315C9.90535 18.3404 9.75266 18.3136 9.60955 18.2527L9.50288 18.2007L7.01844 16.7942C5.94482 16.1864 5.03605 15.2617 4.38807 14.1177C3.74009 12.9737 3.37694 11.6528 3.33696 10.2946L3.33325 10.043V5.54519C3.33326 5.22744 3.41298 4.91623 3.56313 4.64779C3.71328 4.37935 3.92769 4.16472 4.1814 4.02888L4.29473 3.97437L9.47992 1.77286ZM12.5429 7.16885L9.13696 11.025L7.82733 9.54228C7.68833 9.38502 7.49986 9.29672 7.30336 9.2968C7.10686 9.29688 6.91844 9.38533 6.77955 9.5427C6.64065 9.70007 6.56266 9.91346 6.56273 10.1359C6.5628 10.3584 6.64093 10.5717 6.77992 10.729L8.56066 12.7451C8.63633 12.8309 8.72617 12.8989 8.82505 12.9452C8.92393 12.9916 9.02992 13.0155 9.13696 13.0155C9.24399 13.0155 9.34998 12.9916 9.44886 12.9452C9.54774 12.8989 9.63758 12.8309 9.71325 12.7451L13.5903 8.35472C13.661 8.27736 13.7175 8.18482 13.7563 8.0825C13.7951 7.98018 13.8155 7.87013 13.8164 7.75877C13.8173 7.64741 13.7985 7.53698 13.7613 7.43391C13.724 7.33084 13.669 7.2372 13.5995 7.15845C13.5299 7.07971 13.4472 7.01744 13.3562 6.97527C13.2651 6.9331 13.1676 6.91188 13.0693 6.91285C12.9709 6.91381 12.8737 6.93695 12.7833 6.9809C12.6929 7.02486 12.6112 7.08875 12.5429 7.16885Z");
    			attr_dev(path, "fill", "#2FC0A7");
    			add_location(path, file$2, 11, 18, 442);
    			attr_dev(g, "clip-path", "url(#clip0_18844_462)");
    			add_location(g, file$2, 10, 16, 385);
    			attr_dev(rect, "width", "20");
    			attr_dev(rect, "height", "20");
    			attr_dev(rect, "fill", "white");
    			add_location(rect, file$2, 15, 20, 2177);
    			attr_dev(clipPath, "id", "clip0_18844_462");
    			add_location(clipPath, file$2, 14, 18, 2124);
    			add_location(defs, file$2, 13, 16, 2098);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "20");
    			attr_dev(svg, "height", "20");
    			attr_dev(svg, "viewBox", "0 0 20 20");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$2, 9, 12, 272);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(9:12) {#if $Detail.status === 'insured'}",
    		ctx
    	});

    	return block;
    }

    // (43:8) {#if $Detail.status === 'insured'}
    function create_if_block$1(ctx) {
    	let div;
    	let p;
    	let t1;
    	let span;
    	let t2_value = /*$Detail*/ ctx[0].period + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Term of insurance";
    			t1 = space();
    			span = element("span");
    			t2 = text(t2_value);
    			attr_dev(p, "class", "svelte-1e9a3i1");
    			add_location(p, file$2, 44, 12, 4739);
    			attr_dev(span, "class", "svelte-1e9a3i1");
    			add_location(span, file$2, 44, 37, 4764);
    			attr_dev(div, "class", "svelte-1e9a3i1");
    			add_location(div, file$2, 43, 8, 4720);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(div, t1);
    			append_dev(div, span);
    			append_dev(span, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$Detail*/ 1 && t2_value !== (t2_value = /*$Detail*/ ctx[0].period + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(43:8) {#if $Detail.status === 'insured'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let div1;
    	let div0;
    	let span0;
    	let t0_value = /*$Detail*/ ctx[0].status + "";
    	let t0;
    	let t1;
    	let div0_class_value;
    	let t2;
    	let img;
    	let img_src_value;
    	let t3;
    	let div2;
    	let h3;
    	let t4_value = /*$Detail*/ ctx[0].name + "";
    	let t4;
    	let t5;
    	let h5;
    	let t6_value = /*$Detail*/ ctx[0].type + "";
    	let t6;
    	let t7;
    	let article;
    	let div3;
    	let p0;

    	let t8_value = (/*$Detail*/ ctx[0].status === 'insured'
    	? 'Insurance amount'
    	: 'Cost of insurance') + "";

    	let t8;
    	let t9;
    	let span1;

    	let t10_value = (/*$Detail*/ ctx[0].status === 'insured'
    	? /*$Detail*/ ctx[0].insuredAmount
    	: /*$Detail*/ ctx[0].costOfInsurance) + "";

    	let t10;
    	let t11;
    	let t12;
    	let div4;
    	let p1;
    	let t14;
    	let span2;
    	let t15_value = /*$Detail*/ ctx[0].crashes + "";
    	let t15;
    	let t16;
    	let div5;
    	let p2;
    	let t18;
    	let span3;
    	let t19_value = /*$Detail*/ ctx[0].autoCost + "";
    	let t19;
    	let t20;
    	let button;

    	let t21_value = (/*$Detail*/ ctx[0].status === 'insured'
    	? 'CANCEL'
    	: 'GET') + "";

    	let t21;
    	let t22;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*$Detail*/ ctx[0].status === 'insured') return create_if_block_1$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*$Detail*/ ctx[0].status === 'insured' && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if_block0.c();
    			t2 = space();
    			img = element("img");
    			t3 = space();
    			div2 = element("div");
    			h3 = element("h3");
    			t4 = text(t4_value);
    			t5 = space();
    			h5 = element("h5");
    			t6 = text(t6_value);
    			t7 = space();
    			article = element("article");
    			div3 = element("div");
    			p0 = element("p");
    			t8 = text(t8_value);
    			t9 = space();
    			span1 = element("span");
    			t10 = text(t10_value);
    			t11 = space();
    			if (if_block1) if_block1.c();
    			t12 = space();
    			div4 = element("div");
    			p1 = element("p");
    			p1.textContent = "Number of crashes";
    			t14 = space();
    			span2 = element("span");
    			t15 = text(t15_value);
    			t16 = space();
    			div5 = element("div");
    			p2 = element("p");
    			p2.textContent = "Cost of auto";
    			t18 = space();
    			span3 = element("span");
    			t19 = text(t19_value);
    			t20 = space();
    			button = element("button");
    			t21 = text(t21_value);
    			t22 = text(" INSURANCE");
    			attr_dev(span0, "class", "svelte-1e9a3i1");
    			add_location(span0, file$2, 7, 12, 181);
    			attr_dev(div0, "class", div0_class_value = "status " + /*$Detail*/ ctx[0].status + " svelte-1e9a3i1");
    			add_location(div0, file$2, 6, 8, 130);
    			if (!src_url_equal(img.src, img_src_value = /*$Detail*/ ctx[0].imgUrl)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "car");
    			attr_dev(img, "class", "svelte-1e9a3i1");
    			add_location(img, file$2, 32, 8, 4295);
    			attr_dev(div1, "class", "img-cont svelte-1e9a3i1");
    			add_location(div1, file$2, 5, 4, 98);
    			attr_dev(h3, "class", "svelte-1e9a3i1");
    			add_location(h3, file$2, 35, 8, 4364);
    			attr_dev(h5, "class", "svelte-1e9a3i1");
    			add_location(h5, file$2, 36, 8, 4397);
    			attr_dev(div2, "class", "svelte-1e9a3i1");
    			add_location(div2, file$2, 34, 4, 4349);
    			attr_dev(p0, "class", "svelte-1e9a3i1");
    			add_location(p0, file$2, 40, 12, 4476);
    			attr_dev(span1, "class", "svelte-1e9a3i1");
    			add_location(span1, file$2, 40, 93, 4557);
    			attr_dev(div3, "class", "svelte-1e9a3i1");
    			add_location(div3, file$2, 39, 8, 4457);
    			attr_dev(p1, "class", "svelte-1e9a3i1");
    			add_location(p1, file$2, 48, 12, 4853);
    			attr_dev(span2, "class", "svelte-1e9a3i1");
    			add_location(span2, file$2, 48, 37, 4878);
    			attr_dev(div4, "class", "svelte-1e9a3i1");
    			add_location(div4, file$2, 47, 8, 4834);
    			attr_dev(p2, "class", "svelte-1e9a3i1");
    			add_location(p2, file$2, 51, 12, 4953);
    			attr_dev(span3, "class", "svelte-1e9a3i1");
    			add_location(span3, file$2, 51, 32, 4973);
    			attr_dev(div5, "class", "svelte-1e9a3i1");
    			add_location(div5, file$2, 50, 8, 4934);
    			attr_dev(article, "class", "svelte-1e9a3i1");
    			add_location(article, file$2, 38, 4, 4438);

    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*$Detail*/ ctx[0].status === 'insured'
    			? 'red-btn'
    			: 'green-btn') + " svelte-1e9a3i1"));

    			add_location(button, file$2, 54, 4, 5042);
    			attr_dev(main, "class", "svelte-1e9a3i1");
    			add_location(main, file$2, 4, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div0, t1);
    			if_block0.m(div0, null);
    			append_dev(div1, t2);
    			append_dev(div1, img);
    			append_dev(main, t3);
    			append_dev(main, div2);
    			append_dev(div2, h3);
    			append_dev(h3, t4);
    			append_dev(div2, t5);
    			append_dev(div2, h5);
    			append_dev(h5, t6);
    			append_dev(main, t7);
    			append_dev(main, article);
    			append_dev(article, div3);
    			append_dev(div3, p0);
    			append_dev(p0, t8);
    			append_dev(div3, t9);
    			append_dev(div3, span1);
    			append_dev(span1, t10);
    			append_dev(article, t11);
    			if (if_block1) if_block1.m(article, null);
    			append_dev(article, t12);
    			append_dev(article, div4);
    			append_dev(div4, p1);
    			append_dev(div4, t14);
    			append_dev(div4, span2);
    			append_dev(span2, t15);
    			append_dev(article, t16);
    			append_dev(article, div5);
    			append_dev(div5, p2);
    			append_dev(div5, t18);
    			append_dev(div5, span3);
    			append_dev(span3, t19);
    			append_dev(main, t20);
    			append_dev(main, button);
    			append_dev(button, t21);
    			append_dev(button, t22);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[1], false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$Detail*/ 1 && t0_value !== (t0_value = /*$Detail*/ ctx[0].status + "")) set_data_dev(t0, t0_value);

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, null);
    				}
    			}

    			if (dirty & /*$Detail*/ 1 && div0_class_value !== (div0_class_value = "status " + /*$Detail*/ ctx[0].status + " svelte-1e9a3i1")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*$Detail*/ 1 && !src_url_equal(img.src, img_src_value = /*$Detail*/ ctx[0].imgUrl)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*$Detail*/ 1 && t4_value !== (t4_value = /*$Detail*/ ctx[0].name + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$Detail*/ 1 && t6_value !== (t6_value = /*$Detail*/ ctx[0].type + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*$Detail*/ 1 && t8_value !== (t8_value = (/*$Detail*/ ctx[0].status === 'insured'
    			? 'Insurance amount'
    			: 'Cost of insurance') + "")) set_data_dev(t8, t8_value);

    			if (dirty & /*$Detail*/ 1 && t10_value !== (t10_value = (/*$Detail*/ ctx[0].status === 'insured'
    			? /*$Detail*/ ctx[0].insuredAmount
    			: /*$Detail*/ ctx[0].costOfInsurance) + "")) set_data_dev(t10, t10_value);

    			if (/*$Detail*/ ctx[0].status === 'insured') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(article, t12);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*$Detail*/ 1 && t15_value !== (t15_value = /*$Detail*/ ctx[0].crashes + "")) set_data_dev(t15, t15_value);
    			if (dirty & /*$Detail*/ 1 && t19_value !== (t19_value = /*$Detail*/ ctx[0].autoCost + "")) set_data_dev(t19, t19_value);

    			if (dirty & /*$Detail*/ 1 && t21_value !== (t21_value = (/*$Detail*/ ctx[0].status === 'insured'
    			? 'CANCEL'
    			: 'GET') + "")) set_data_dev(t21, t21_value);

    			if (dirty & /*$Detail*/ 1 && button_class_value !== (button_class_value = "" + (null_to_empty(/*$Detail*/ ctx[0].status === 'insured'
    			? 'red-btn'
    			: 'green-btn') + " svelte-1e9a3i1"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $Detail;
    	validate_store(Detail, 'Detail');
    	component_subscribe($$self, Detail, $$value => $$invalidate(0, $Detail = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Details', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Details> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => checkDetail.set(true);
    	$$self.$capture_state = () => ({ Detail, checkDetail, $Detail });
    	return [$Detail, click_handler];
    }

    class Details extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Details",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\shared\Location.svelte generated by Svelte v3.59.2 */
    const file$1 = "src\\components\\shared\\Location.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let svg;
    	let path;
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t1 = text(" BACK");
    			if (!src_url_equal(img.src, img_src_value = "../static/map.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "map");
    			attr_dev(img, "class", "svelte-lqj4p4");
    			add_location(img, file$1, 5, 4, 89);
    			attr_dev(path, "d", "M7.64331 16L9 14.58L2.71338 8L9 1.42L7.64331 0L0 8L7.64331 16Z");
    			attr_dev(path, "fill", "#0975FD");
    			attr_dev(path, "class", "svelte-lqj4p4");
    			add_location(path, file$1, 8, 12, 330);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "9");
    			attr_dev(svg, "height", "16");
    			attr_dev(svg, "viewBox", "0 0 9 16");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$1, 7, 8, 223);
    			attr_dev(div, "class", "back svelte-lqj4p4");
    			add_location(div, file$1, 6, 4, 134);
    			attr_dev(section, "class", "svelte-lqj4p4");
    			add_location(section, file$1, 4, 0, 74);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, img);
    			append_dev(section, t0);
    			append_dev(section, div);
    			append_dev(div, svg);
    			append_dev(svg, path);
    			append_dev(div, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler*/ ctx[0], false, false, false, false),
    					listen_dev(div, "keydown", keydown_handler, false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler = () => {
    	
    };

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Location', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Location> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => isLocation.set(false);
    	$$self.$capture_state = () => ({ isLocation });
    	return [click_handler];
    }

    class Location extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Location",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    // (24:12) {:else}
    function create_else_block(ctx) {
    	let header;
    	let t;
    	let section;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	header = new Header({ $$inline: true });
    	const if_block_creators = [create_if_block_3, create_if_block_4, create_if_block_5, create_if_block_6];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*$ActiveTab*/ ctx[1] === 'dashboard') return 0;
    		if (/*$ActiveTab*/ ctx[1] === 'your vehicles') return 1;
    		if (/*$ActiveTab*/ ctx[1] === 'destroyed vehicles') return 2;
    		if (/*$ActiveTab*/ ctx[1] === 'notifications') return 3;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_1(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t = space();
    			section = element("section");
    			if (if_block) if_block.c();
    			attr_dev(section, "class", "svelte-acaxry");
    			add_location(section, file, 25, 12, 992);
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, section, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(section, null);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(section);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(24:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (19:8) {#if details}
    function create_if_block_2(ctx) {
    	let detailheader;
    	let t;
    	let section;
    	let details_1;
    	let current;
    	detailheader = new DetailHeader({ $$inline: true });
    	details_1 = new Details({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(detailheader.$$.fragment);
    			t = space();
    			section = element("section");
    			create_component(details_1.$$.fragment);
    			attr_dev(section, "class", "svelte-acaxry");
    			add_location(section, file, 20, 12, 873);
    		},
    		m: function mount(target, anchor) {
    			mount_component(detailheader, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(details_1, section, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(detailheader.$$.fragment, local);
    			transition_in(details_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(detailheader.$$.fragment, local);
    			transition_out(details_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(detailheader, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(section);
    			destroy_component(details_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(19:8) {#if details}",
    		ctx
    	});

    	return block;
    }

    // (33:61) 
    function create_if_block_6(ctx) {
    	let notifications;
    	let current;
    	notifications = new Notifications({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(notifications.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(notifications, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(notifications.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(notifications.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(notifications, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(33:61) ",
    		ctx
    	});

    	return block;
    }

    // (31:66) 
    function create_if_block_5(ctx) {
    	let destroyedvehicles;
    	let current;
    	destroyedvehicles = new DestroyedVehicles({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(destroyedvehicles.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(destroyedvehicles, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(destroyedvehicles.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(destroyedvehicles.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(destroyedvehicles, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(31:66) ",
    		ctx
    	});

    	return block;
    }

    // (29:62) 
    function create_if_block_4(ctx) {
    	let vehicles;
    	let current;
    	vehicles = new Vehicles({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(vehicles.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(vehicles, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(vehicles.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(vehicles.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(vehicles, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(29:62) ",
    		ctx
    	});

    	return block;
    }

    // (27:16) {#if $ActiveTab === 'dashboard'}
    function create_if_block_3(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(27:16) {#if $ActiveTab === 'dashboard'}",
    		ctx
    	});

    	return block;
    }

    // (40:4) {#if $checkDetail}
    function create_if_block_1(ctx) {
    	let popup;
    	let current;
    	popup = new Popup({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(popup.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(popup, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(popup.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(popup.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(popup, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(40:4) {#if $checkDetail}",
    		ctx
    	});

    	return block;
    }

    // (43:4) {#if $isLocation}
    function create_if_block(ctx) {
    	let location;
    	let current;
    	location = new Location({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(location.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(location, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(location.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(location.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(location, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(43:4) {#if $isLocation}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let div;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let menu;
    	let t1;
    	let t2;
    	let current;
    	const if_block_creators = [create_if_block_2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*details*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	menu = new Menu({ $$inline: true });
    	let if_block1 = /*$checkDetail*/ ctx[2] && create_if_block_1(ctx);
    	let if_block2 = /*$isLocation*/ ctx[3] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			if_block0.c();
    			t0 = space();
    			create_component(menu.$$.fragment);
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(div, "class", "svelte-acaxry");
    			add_location(div, file, 17, 4, 802);
    			attr_dev(main, "class", "app svelte-acaxry");
    			add_location(main, file, 16, 0, 778);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(div, t0);
    			mount_component(menu, div, null);
    			append_dev(main, t1);
    			if (if_block1) if_block1.m(main, null);
    			append_dev(main, t2);
    			if (if_block2) if_block2.m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(div, t0);
    			}

    			if (/*$checkDetail*/ ctx[2]) {
    				if (if_block1) {
    					if (dirty & /*$checkDetail*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(main, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*$isLocation*/ ctx[3]) {
    				if (if_block2) {
    					if (dirty & /*$isLocation*/ 8) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(main, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(menu.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(menu.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
    			destroy_component(menu);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let details;
    	let $Detail;
    	let $ActiveTab;
    	let $checkDetail;
    	let $isLocation;
    	validate_store(Detail, 'Detail');
    	component_subscribe($$self, Detail, $$value => $$invalidate(4, $Detail = $$value));
    	validate_store(ActiveTab, 'ActiveTab');
    	component_subscribe($$self, ActiveTab, $$value => $$invalidate(1, $ActiveTab = $$value));
    	validate_store(checkDetail, 'checkDetail');
    	component_subscribe($$self, checkDetail, $$value => $$invalidate(2, $checkDetail = $$value));
    	validate_store(isLocation, 'isLocation');
    	component_subscribe($$self, isLocation, $$value => $$invalidate(3, $isLocation = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ActiveTab,
    		checkDetail,
    		Detail,
    		isLocation,
    		Header,
    		Menu,
    		Home,
    		Vehicles,
    		DestroyedVehicles,
    		Notifications,
    		Popup,
    		DetailHeader,
    		Details,
    		Location,
    		details,
    		$Detail,
    		$ActiveTab,
    		$checkDetail,
    		$isLocation
    	});

    	$$self.$inject_state = $$props => {
    		if ('details' in $$props) $$invalidate(0, details = $$props.details);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$Detail*/ 16) {
    			$$invalidate(0, details = $Detail);
    		}
    	};

    	return [details, $ActiveTab, $checkDetail, $isLocation, $Detail];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.getElementById('app'),
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
