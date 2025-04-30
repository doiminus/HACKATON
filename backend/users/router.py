class AuthRouter:
    route_app_labels = {'users', 'admin', 'contenttypes', 'sessions',} #
    
    def db_for_read(self, model, **hints):
        return None
    
    def db_for_write(self, model, **hints):
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        return None   
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        return None
        

        