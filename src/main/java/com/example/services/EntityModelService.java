package com.example.services;

import com.example.data.dao.EntityModelDao;
import com.example.data.models.MyEntityModel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class EntityModelService {

    private final EntityModelDao entityModelDao = new EntityModelDao();

    public void saveModel(MyEntityModel model) {
        entityModelDao.save(model);
    }

    public List<MyEntityModel> findAllUsers() {
        return entityModelDao.findAll();
    }

}
