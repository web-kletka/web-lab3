package com.example.services;

import com.example.daos.PointsDAO;
import com.example.entities.PointEntity;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class EntityModelService {

    private final PointsDAO entityModelDao = new PointsDAO("PERSISTENCE");

    public void saveModel(PointEntity model) {
        entityModelDao.save(model);
    }

    public void clearTable(){entityModelDao.clear();}

    public List<PointEntity> findAllUsers() {
        return entityModelDao.findAll();
    }

}
