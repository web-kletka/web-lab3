package com.example.data.dao;

import com.example.data.models.MyEntityModel;
import jakarta.persistence.PersistenceContext;

import jakarta.persistence.EntityManager;
import java.util.List;


public class EntityModelDao {

    private EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();

    public MyEntityModel findById(int id){
        em.getTransaction().begin();
        MyEntityModel model = em.find(MyEntityModel.class, id);
        em.getTransaction().commit();
        return model;
    }

    public void save(MyEntityModel model) {
        em.getTransaction().begin();
        em.persist(model);
        em.getTransaction().commit();
    }

    public List<MyEntityModel> findAll() {
        em.getTransaction().begin();
        List<MyEntityModel> list = em.createQuery("from MyEntityModel", MyEntityModel.class).getResultList();
        em.getTransaction().commit();
        return list;
    }
}
