class NotImplementedException extends Error {
    constructor(message) {
        this.message = message || "Error, this method has to be implemented"
    }
}

class ISubject {

    subscribe(observer) {
        throw new NotImplementedException()
    }
    unsubscribe(observer) {
        throw new NotImplementedException()
    }
    notify() {
        throw new NotImplementedException()
    }
}


class Observer {
    constructor(name) {
        this.observerName = name
        this.update = this._update
    }

    _update(newValue, oldValue) {
        console.log(`${this.observerName}, the value ${oldValue} was changed to ${newValue}`)
    }
}


class Subject extends ISubject {

    constructor() {
        super()
        this.observers = []
        const inventory = {
            set: (target, propertyKey, newValue) => {
                this.notify(newValue, target[propertyKey])
                target[propertyKey] = newValue
                return true
            }
        }
        this._item = new Proxy({
            count: 0,
        }, inventory)
    }

    next(value) {
        this._item.count = value;
    }

    notify(newValue, oldValue) {
        this.observers.forEach(observer => observer.update(newValue, oldValue))
    }

    unsubscribe(observer) {
        const index = this.observers.indexOf(observer)
        console.log(`x${this.observers[index].observerName} will not notified anymore`)
        this.observers.splice(index, 1)
    }

    subscribe(observable) {
        this.observers.push(observable)
    }
}
// behavioral pattern
/**
 * We can say that observer is 
 * something (objects in case of OOPS) which is looking upon (observing) 
 * other object(s). Observer pattern is popularly known to be based on 
 * "The Hollywood Principle" which says- "Don’t call us, we will call you." 
 * Pub-Sub (Publisher-Subscriber) is yet another popular nickname given to 
 * Observer pattern.

 The online electronic store is going to be the subject.
  Whenever the subject would have any addition in its inventory, 
  the observers (customers/users) who have subscribed to store notifications
   would be notified through email
 */
(async function main() {
    const subject = new Subject()
    // Observer1 takes a subscription to the store
    const observer1 = new Observer("Erick")
    subject.subscribe(observer1)

    // Observer2 also subscribes to the store
    const observer2 = new Observer("Camilla")
    subject.subscribe(observer2)
    subject.next(1);

    // Observer1 unsubscribes 
    subject.unsubscribe(observer1)

    // Observer3 subscribes to notifications.
    subject.subscribe(new Observer("Amanda"))
    subject.next(2);

})()